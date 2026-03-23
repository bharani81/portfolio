import { usePortfolioData } from '@hooks/usePortfolioData';
import { FadeInView } from '@components/FadeInView';
import { CountUp } from '@components/CountUp';
import { TerminalLog } from '@components/TerminalLog';
import { SectionWrapper } from '@components/SectionWrapper';
import { MapPin, BookOpen } from 'lucide-react';

const terminalLines = [
  { type: 'prompt' as const, text: 'whoami' },
  { type: 'output' as const, text: 'bharanidharan — backend engineer, golang specialist' },
  { type: 'prompt' as const, text: 'cat /etc/location' },
  { type: 'output' as const, text: 'Bangalore, India' },
  { type: 'prompt' as const, text: 'curl http://experience.api/current' },
  { type: 'success' as const, text: '{"role":"SDE","company":"Billionhearts","stack":["Golang","AWS","Redis"]}' },
  { type: 'prompt' as const, text: 'ping motivation' },
  { type: 'success' as const, text: 'PONG — 0ms latency 🚀' },
];
import { GlassCard } from '@components/GlassCard'; // Added GlassCard import

export function About() {
  const { profile } = usePortfolioData();

  return (
    <SectionWrapper id="about">
      <div className="grid lg:grid-cols-3 gap-12 lg:gap-16 items-start">
        {/* Left Column: sticky section title */}
        <FadeInView className="lg:sticky lg:top-32 lg:col-span-1">
          <span className="section-label">01 / about</span>
          <h2 className="section-title">
            CS foundation → <br className="hidden lg:block" />
            <span className="gradient-text">relentless builder.</span>
          </h2>
          <p className="section-subtitle">The story behind the engineer</p>
        </FadeInView>

        {/* Right Column: biological content */}
        <div className="grid lg:grid-cols-2 gap-10 items-start lg:col-span-2">
          {/* Bio text */}
          <FadeInView delay={0.1} className="prose-default space-y-6">
            <p>
              Hey there. I'm a backend engineer with a degree in Computer Science and Engineering.
              I don't just write code — I design systems that solve real business problems, scale
              efficiently, and don't wake people up at 3 AM.
            </p>
            <p>
              My expertise lies in building high-throughput APIs, distributed microservices, and reliable
              event-driven architectures. I thrive in the complexities of database optimization,
              concurrent processing, and cloud-native infrastructure.
            </p>
            <p>
              Currently, I'm building scalable backends at <strong>Billionhearts Software Technologies</strong>,
              optimizing data pipelines and delivering sub-millisecond latencies for consumer applications.
            </p>
          </FadeInView>

          {/* Terminal Code Block Simulator */}
          <FadeInView delay={0.2} className="w-full">
            <GlassCard className="overflow-hidden border-white/10 group hover:border-brand-500/30 transition-colors">
              <div className="bg-slate-900/80 px-4 py-2 flex items-center gap-2 border-b border-white/5">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                  <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
                </div>
                <span className="text-xs font-mono text-slate-500 ml-2">~ / about.sh</span>
              </div>
              <div className="p-5 font-mono text-sm leading-relaxed overflow-x-auto">
                <div className="flex text-slate-400">
                  <span className="text-brand-400 mr-2">$</span>
                  <span className="text-white">cat profile.json</span>
                </div>
                <div className="mt-2 text-brand-300">
                  {`{`}
                </div>
                <div className="pl-4 space-y-1">
                  <div className="text-slate-300">
                    <span className="text-purple-400">"role"</span>: <span className="text-amber-300">"Backend Engineer"</span>,
                  </div>
                  <div className="text-slate-300">
                    <span className="text-purple-400">"focus"</span>: <span className="text-amber-300">"Distributed Systems"</span>,
                  </div>
                  <div className="text-slate-300">
                    <span className="text-purple-400">"education"</span>: <span className="text-amber-300">"B.Tech CSE"</span>,
                  </div>
                  <div className="text-slate-300">
                    <span className="text-purple-400">"motto"</span>: <span className="text-amber-300">"Build it right, build it fast."</span>
                  </div>
                </div>
                <div className="text-brand-300">
                  {`}`}
                </div>
              </div>
            </GlassCard>
          </FadeInView>
        </div>
      </div>
    </SectionWrapper>
  );
}
