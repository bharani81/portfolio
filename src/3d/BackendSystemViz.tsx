import { useRef, useState, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere, Line, Text, Html } from '@react-three/drei';
import * as THREE from 'three';

interface NodeData {
  id: string;
  label: string;
  description: string;
  tech: string;
  color: string;
  position: [number, number, number];
  connections: string[];
}

const NODES: NodeData[] = [
  { id: 'gateway',  label: 'API Gateway',   description: 'Routes & rate-limits requests',  tech: 'Golang/Gin',    color: '#00e5ad', position: [0, 1.5, 0],   connections: ['auth', 'cache'] },
  { id: 'auth',     label: 'Auth Service',  description: 'JWT validation & RBAC',          tech: 'Golang',        color: '#8b5cf6', position: [-2, 0, 0],    connections: ['db']            },
  { id: 'cache',    label: 'Redis Cache',   description: 'L2 cache, sub-ms reads',         tech: 'Redis',         color: '#f59e0b', position: [2, 0, 0],     connections: ['db', 'queue']   },
  { id: 'queue',    label: 'SQS Queue',     description: 'Async task decoupling',           tech: 'AWS SQS',       color: '#00e5ad', position: [2, -1.5, 0],  connections: ['worker']        },
  { id: 'worker',   label: 'Lambda Worker', description: 'Event-driven processing',        tech: 'AWS Lambda',    color: '#8b5cf6', position: [0, -1.5, 0],  connections: ['db']            },
  { id: 'db',       label: 'PostgreSQL',    description: 'Primary relational store',       tech: 'PostgreSQL',    color: '#22c55e', position: [-2, -1.5, 0],  connections: []               },
];

interface PacketState {
  nodeFrom: string;
  nodeTo: string;
  t: number;
  color: string;
}

function ServiceNode({ node, isActive, onClick }: { node: NodeData; isActive: boolean; onClick: () => void }) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (meshRef.current) {
      meshRef.current.position.y = node.position[1] + Math.sin(clock.elapsedTime + node.position[0]) * 0.07;
    }
  });

  return (
    <group position={node.position} onClick={(e) => { e.stopPropagation(); onClick(); }}>
      <Sphere ref={meshRef} args={[isActive ? 0.22 : 0.18, 32, 32]}>
        <meshStandardMaterial
          color={node.color}
          emissive={node.color}
          emissiveIntensity={isActive ? 1.2 : 0.5}
          roughness={0.2}
          metalness={0.8}
        />
      </Sphere>

      {/* Pulse ring when active */}
      {isActive && (
        <Sphere args={[0.32, 16, 16]}>
          <meshStandardMaterial color={node.color} transparent opacity={0.15} />
        </Sphere>
      )}

      {/* Label */}
      <Text
        position={[0, 0.35, 0]}
        fontSize={0.11}
        color={node.color}
        anchorX="center"
        anchorY="bottom"
        font="https://fonts.gstatic.com/s/jetbrainsmono/v18/tDbY2o-flEEny0FZhsfKu5WU4zr3E_BX0PnT8RD8yKxjChK9.woff2"
      >
        {node.label}
      </Text>

      {/* Info HUD on click */}
      {isActive && (
        <Html position={[0.35, 0.35, 0]} style={{ pointerEvents: 'none' }}>
          <div className="glass rounded-lg p-2 min-w-[140px] border border-white/10" style={{ fontSize: 10 }}>
            <div className="font-bold text-white mb-1" style={{ fontFamily: 'Inter, sans-serif' }}>{node.label}</div>
            <div className="text-slate-400 mb-1" style={{ fontFamily: 'Inter, sans-serif' }}>{node.description}</div>
            <span className="tech-badge" style={{ fontSize: 9 }}>{node.tech}</span>
          </div>
        </Html>
      )}
    </group>
  );
}

function Packet({ fromPos, toPos, t, color }: { fromPos: [number,number,number]; toPos: [number,number,number]; t: number; color: string }) {
  const pos = useMemo(() => {
    const from = new THREE.Vector3(...fromPos);
    const to = new THREE.Vector3(...toPos);
    return from.lerp(to, t);
  }, [fromPos, toPos, t]);

  return (
    <Sphere position={[pos.x, pos.y, pos.z]} args={[0.06, 8, 8]}>
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={2} />
    </Sphere>
  );
}

export function BackendSystemViz({ onSimulate }: { onSimulate?: () => void }) {
  const [activeNode, setActiveNode] = useState<string | null>(null);
  const [packets, setPackets] = useState<PacketState[]>([]);
  const packetsRef = useRef(packets);
  packetsRef.current = packets;

  const nodeMap = useMemo(() => Object.fromEntries(NODES.map(n => [n.id, n])), []);

  // Animate packets
  useFrame((_, delta) => {
    setPackets(prev =>
      prev
        .map(p => ({ ...p, t: p.t + delta * 0.8 }))
        .filter(p => p.t < 1)
    );
  });

  const simulateRequest = () => {
    onSimulate?.();
    // Full request path: gateway → auth → cache → queue → worker → db
    const path = ['gateway', 'auth', 'cache', 'queue', 'worker', 'db'];
    path.slice(0, -1).forEach((id, i) => {
      setTimeout(() => {
        const fromNode = nodeMap[id];
        const toNode = nodeMap[path[i + 1]];
        if (!fromNode || !toNode) return;
        setPackets(prev => [
          ...prev,
          { nodeFrom: id, nodeTo: path[i + 1], t: 0, color: fromNode.color },
        ]);
      }, i * 400);
    });
  };

  return (
    <group>
      <ambientLight intensity={0.3} />
      <pointLight position={[5, 5, 5]} intensity={0.8} />
      <pointLight position={[-5, -5, 5]} intensity={0.4} color="#8b5cf6" />

      {/* Connection lines */}
      {NODES.map(node =>
        node.connections.map(targetId => {
          const target = nodeMap[targetId];
          if (!target) return null;
          const isHighlighted = node.id === activeNode || targetId === activeNode;
          return (
            <Line
              key={`${node.id}-${targetId}`}
              points={[node.position, target.position]}
              color={isHighlighted ? '#00e5ad' : '#1a3a5c'}
              lineWidth={isHighlighted ? 2 : 1}
              transparent
              opacity={isHighlighted ? 0.9 : 0.35}
            />
          );
        })
      )}

      {/* Nodes */}
      {NODES.map(node => (
        <ServiceNode
          key={node.id}
          node={node}
          isActive={activeNode === node.id}
          onClick={() => setActiveNode(id => id === node.id ? null : node.id)}
        />
      ))}

      {/* Packets */}
      {packets.map((pkt, i) => {
        const from = nodeMap[pkt.nodeFrom];
        const to = nodeMap[pkt.nodeTo];
        if (!from || !to) return null;
        return <Packet key={i} fromPos={from.position} toPos={to.position} t={pkt.t} color={pkt.color} />;
      })}

      {/* Simulate button */}
      <Html position={[0, 2.4, 0]} center>
        <button
          onClick={simulateRequest}
          className="px-3 py-1.5 rounded-lg text-xs font-mono font-semibold border border-brand-400/40 text-brand-400 bg-dark-900/80 hover:bg-brand-500/20 transition-all cursor-pointer"
        >
          ▶ Simulate Request
        </button>
      </Html>
    </group>
  );
}
