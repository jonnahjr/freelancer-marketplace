import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-surface border-t mt-16 text-muted">
      <div className="container mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <div className="text-xl font-bold">Freelancer Marketplace</div>
          <p className="text-sm mt-2">Connect. Hire. Deliver.</p>
        </div>

        <div className="flex gap-6">
          <div>
            <h4 className="font-semibold">Product</h4>
            <ul className="mt-2 space-y-1 text-sm">
              <li>Jobs</li>
              <li>Post Job</li>
              <li>Pricing</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold">Company</h4>
            <ul className="mt-2 space-y-1 text-sm">
              <li>About</li>
              <li>Careers</li>
              <li>Contact</li>
            </ul>
          </div>
        </div>

        <div className="text-sm">
          <h4 className="font-semibold">Stay up to date</h4>
          <p className="mt-2">Subscribe to receive product updates and news.</p>
          <div className="mt-3 flex gap-2">
            <input aria-label="email" className="flex-1 px-3 py-2 border rounded bg-surface" placeholder="you@domain.com" />
            <button className="px-4 py-2 btn-primary">Subscribe</button>
          </div>
        </div>
      </div>
      <div className="border-t">
        <div className="container mx-auto px-6 py-4 text-sm">© {new Date().getFullYear()} Freelancer Marketplace</div>
      </div>
    </footer>
  );
}
