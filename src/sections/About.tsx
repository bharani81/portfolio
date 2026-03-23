import { usePortfolioData } from '@hooks/usePortfolioData';
import { FadeInView } from '@components/FadeInView';
import { SectionWrapper } from '@components/SectionWrapper';
import { GlassCard } from '@components/GlassCard';

export function About() {
  const { profile } = usePortfolioData();

  return (
    <SectionWrapper id="about">
      <FadeInView>
        <div className="mb-8">
          <span className="text-brand-400 font-mono text-sm block mb-2">01 / about</span>
          <h2 className="text-3xl font-semibold text-white">CS foundation → relentless builder.</h2>
          <p className="text-gray-400 mt-2">The story behind the engineer</p>
        </div>
      </FadeInView>

      <div className="grid lg:grid-cols-2 gap-12 items-start">
        {/* Bio text */}
        <FadeInView delay={0.1}>
          <div className="space-y-6 text-gray-400 max-w-lg text-left">
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
              Currently, I'm building scalable backends at <span className="text-white font-medium">Billionhearts Software Technologies</span>,
              optimizing data pipelines and delivering sub-millisecond latencies for consumer applications.
            </p>
          </div>
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
            <div className="p-5 font-mono text-sm leading-relaxed overflow-x-auto text-left">
              <div className="flex text-gray-400">
                <span className="text-brand-400 mr-2">$</span>
                <span className="text-white">cat profile.json</span>
              </div>
              <div className="mt-2 text-brand-300">
                {`{`}
              </div>
              <div className="pl-4 space-y-1 text-left">
                <div className="text-gray-300">
                  <span className="text-purple-400">"role"</span>: <span className="text-amber-300">"Backend Engineer"</span>,
                </div>
                <div className="text-gray-300">
                  <span className="text-purple-400">"focus"</span>: <span className="text-amber-300">"Distributed Systems"</span>,
                </div>
                <div className="text-gray-300">
                  <span className="text-purple-400">"education"</span>: <span className="text-amber-300">"B.Tech CSE"</span>,
                </div>
                <div className="text-gray-300">
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
    </SectionWrapper>
  );
}
