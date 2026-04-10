import { usePortfolioData } from '@hooks/usePortfolioData';
import { FadeInView } from '@components/FadeInView';
import { GlassCard } from '@components/GlassCard';
import { SectionWrapper } from '@components/SectionWrapper';
import { Mail, Download } from 'lucide-react';
import { trackEvent } from '@lib/analytics';

const GithubIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
  </svg>
);
const LinkedinIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

interface ContactCardProps {
  icon: React.ReactNode;
  iconBg: string;
  label: string;
  value: string;
  href: string;
  cta: string;
  external?: boolean;
  ctaColor?: 'brand' | 'purple';
  onClick?: () => void;
}

function ContactCard({ icon, iconBg, label, value, href, cta, external = false, ctaColor = 'brand', onClick }: ContactCardProps) {
  const btnStyle = ctaColor === 'purple'
    ? { background: 'rgba(139,92,246,0.1)', color: '#a78bfa', borderColor: 'rgba(139,92,246,0.2)' }
    : { background: 'rgba(0,229,173,0.08)', color: '#00e5ad', borderColor: 'rgba(0,229,173,0.2)' };

  return (
    <GlassCard className="p-6 glass-hover h-full">
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', height: '100%' }}>
        {/* Icon + label row */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div
            style={{ width: '2.75rem', height: '2.75rem', borderRadius: '0.75rem', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, background: iconBg }}
          >
            {icon}
          </div>
          <div style={{ minWidth: 0 }}>
            <p style={{ color: '#64748b', fontFamily: 'var(--font-mono)', fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.25rem' }}>{label}</p>
            <p style={{ color: '#fff', fontSize: '0.875rem', fontWeight: 500 }} className="truncate">{value}</p>
          </div>
        </div>
        {/* CTA button — full width at bottom */}
        <a
          href={href}
          target={external ? '_blank' : undefined}
          rel={external ? 'noopener noreferrer' : undefined}
          onClick={onClick}
          style={{
            marginTop: 'auto',
            width: '100%',
            textAlign: 'center',
            padding: '0.75rem 1rem',
            borderRadius: '0.5rem',
            fontSize: '0.8rem',
            fontWeight: 600,
            border: '1px solid',
            transition: 'all 0.2s',
            display: 'block',
            ...btnStyle
          }}
          className="hover:opacity-90"
        >
          {cta}
        </a>
      </div>
    </GlassCard>
  );
}

export function Contact() {
  const { profile } = usePortfolioData();

  return (
    <SectionWrapper id="contact">
      <FadeInView>
        <div className="section-header">
          <span className="section-label">07 / contact</span>
          <h2 className="section-title text-white">Let's build something.</h2>
          <p className="section-subtitle">Open to backend engineering roles and interesting problems.</p>
        </div>
      </FadeInView>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        {/* Contact cards row */}
        <div style={{ display: 'grid', gap: '1.5rem' }} className="sm:grid-cols-2 lg:grid-cols-3">
          <FadeInView delay={0.08}>
            <ContactCard
              icon={<Mail size={18} className="text-brand-400" />}
              iconBg="rgba(0,229,173,0.1)"
              label="email"
              value={profile.email}
              href={`mailto:${profile.email}`}
              cta="Say Hello →"
              onClick={() => trackEvent('contact_email')}
            />
          </FadeInView>

          <FadeInView delay={0.13}>
            <ContactCard
              icon={<span className="text-brand-400"><GithubIcon /></span>}
              iconBg="rgba(0,229,173,0.1)"
              label="github"
              value={profile.socials.github.replace('https://', '')}
              href={profile.socials.github}
              cta="View Code →"
              external
              onClick={() => trackEvent('social_click', { platform: 'github', source: 'contact' })}
            />
          </FadeInView>

          <FadeInView delay={0.18}>
            <ContactCard
              icon={<span className="text-purple-400"><LinkedinIcon /></span>}
              iconBg="rgba(139,92,246,0.1)"
              label="linkedin"
              value={profile.socials.linkedin.replace('https://', '')}
              href={profile.socials.linkedin}
              cta="Connect →"
              external
              ctaColor="purple"
              onClick={() => trackEvent('social_click', { platform: 'linkedin', source: 'contact' })}
            />
          </FadeInView>
        </div>

        {/* Resume CTA */}
        <FadeInView delay={0.23}>
          <div style={{ display: 'flex' }}>
            <a
              href={profile.resumeUrl}
              download
              onClick={() => trackEvent('resume_download', { source: 'contact' })}
              style={{ display: 'inline-flex', alignItems: 'center', gap: '0.625rem', padding: '0.875rem 1.75rem', borderRadius: '0.75rem', fontWeight: 700, fontSize: '0.875rem', background: 'linear-gradient(135deg, #00e5ad, #8b5cf6)', color: '#fff', transition: 'opacity 0.2s' }}
              className="hover:opacity-90"
            >
              <Download size={15} />
              Download Resume (PDF)
            </a>
          </div>
        </FadeInView>
      </div>

      {/* Footer */}
      <FadeInView delay={0.3}>
        <div style={{ marginTop: '4rem', paddingTop: '2rem', borderTop: '1px solid rgba(255,255,255,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
          <p style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: '#475569' }}>
            built with React · Three.js · Framer Motion · Tailwind · deployed on Vercel
          </p>
          <p style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: '#334155' }}>
            © {new Date().getFullYear()} Bharanidharan
          </p>
        </div>
      </FadeInView>
    </SectionWrapper>
  );
}
