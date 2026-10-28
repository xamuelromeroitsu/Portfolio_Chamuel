import HeroExperience from '../components/hero/HeroExperience.jsx';
import Projects from '../components/projects/Projects.jsx';
import ContactSection from '../components/contact/ContactSection.jsx';

export default function HomePage() {
  return (
    <>
      <HeroExperience />
      <div className="site-main">
        <Projects />
        <ContactSection />
      </div>
    </>
  );
}
