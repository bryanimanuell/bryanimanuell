import { Link } from '@/components/ui/Link';
import { FrameSequence } from '@/components/scroll/FrameSequence';
import { ToolsMarquee } from '@/components/ui/ToolsMarquee';
import { LineReveal } from '@/components/scroll/LineReveal';
import { SelectedWork } from '@/components/ui/SelectedWork';
import { MascotsSection } from '@/components/ui/MascotsSection';
import { Contact } from '@/components/ui/Contact';
import { getProjects } from '@/lib/content';
export default function Home() {
  return <main id="main">
    <FrameSequence />
    <ToolsMarquee />
    <section className="section work-section" id="work">
      <LineReveal>
        <h2 className="section-title">Selected<br />
          <span className="light">work.</span>
        </h2>
      </LineReveal>
      <SelectedWork projects={getProjects()} />
    </section>
    {/* <MascotsSection /> */}
    <section className="section perspective-teaser"><p className="mono">A little perspective</p><LineReveal><h2>Good software<br />should <span className="light">feel good.</span></h2></LineReveal><div className="offset-copy"><p>Having an website idea for your passion? <br />I could make it happen.</p><Link className="text-link" href="/about">About me <span aria-hidden="true">↗</span></Link></div></section>
    <Contact />
  </main>;
}
