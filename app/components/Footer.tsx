export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="footer-col">
          <h4 className="footer-heading">CONTACT</h4>
          <a href="mailto:hello@meraj.dev" className="footer-link">hello@meraj.dev</a>
          <a href="tel:+8801700000000" className="footer-link">+880 1700 000 000</a>
        </div>
        <div className="footer-col">
          <h4 className="footer-heading">SOCIALS</h4>
          <a href="https://github.com/meraj" target="_blank" rel="noreferrer" className="footer-link">GitHub</a>
          <a href="https://linkedin.com/in/meraj" target="_blank" rel="noreferrer" className="footer-link">LinkedIn</a>
          <a href="https://twitter.com/meraj" target="_blank" rel="noreferrer" className="footer-link">Twitter</a>
        </div>
        <div className="footer-col">
          <h4 className="footer-heading">RESOURCES</h4>
          <a href="/resume.pdf" target="_blank" rel="noreferrer" className="footer-link">Download Resume</a>
        </div>
      </div>
      <div className="footer-bottom">
        <span className="footer-copy">
          &copy; {new Date().getFullYear()} MERAJ HOSSAIN. ALL RIGHTS RESERVED.
        </span>
        <span className="footer-local">BASED IN DHAKA, BD</span>
      </div>
    </footer>
  );
}
