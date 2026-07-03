export default function Footer() {
  return (
    <footer>
      <div className="wrap">
        <div className="foot-top">
          <div>
            <div className="logo-mark">
              <span className="logo-plus">+</span>CreNeev
            </div>
            <p style={{ maxWidth: 260, color: 'var(--gray)', fontSize: 14, marginTop: 16, lineHeight: 1.7 }}>
              Where Brands Begin. A creative foundation for restaurants, studios, clinics and local
              businesses.
            </p>
          </div>
          <div className="foot-cols">
            <div className="foot-col">
              <h5>Studio</h5>
              <a href="#industries">Industries</a>
              <a href="#work">Portfolio</a>
              <a href="#services">Services</a>
              <a href="#pricing">Pricing</a>
            </div>
            <div className="foot-col">
              <h5>Connect</h5>
              <a href="#">Instagram</a>
              <a href="#">LinkedIn</a>
              <a href="#">hello@creneev.com</a>
            </div>
          </div>
        </div>
        <div className="foot-bottom">
          <span>© 2026 CreNeev Studio. All rights reserved.</span>
          <span>Where Brands Begin.</span>
        </div>
      </div>
    </footer>
  );
}
