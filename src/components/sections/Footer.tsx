import { Github, Linkedin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="py-8 px-6 border-t border-white/5">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <span className="text-xl font-bold text-gradient">AB</span>
          <span className="text-muted-foreground">-</span>
          <span className="text-sm text-muted-foreground">
            Full-Stack Developer
          </span>
        </div>

        <div className="flex items-center gap-4">
          <a
            href="https://github.com/alibayramli"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Visit GitHub profile"
          >
            <Github className="w-5 h-5" />
          </a>
          <a
            href="https://www.linkedin.com/in/alibayramli"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Visit LinkedIn profile"
          >
            <Linkedin className="w-5 h-5" />
          </a>
        </div>

        <div className="text-sm text-muted-foreground">
          (c) {new Date().getFullYear()} Ali Bayramli
        </div>
      </div>
    </footer>
  );
};

export default Footer;
