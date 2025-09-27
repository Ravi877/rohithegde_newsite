// components/Footer.js

// A simple footer with a copyright notice.
export default function Footer() {
  return (
    <footer className="bg-dark-navy border-t border-white/10">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 text-center text-light-slate">
        <p>&copy; {new Date().getFullYear()} Rohit Hegde. All Rights Reserved.</p>
      </div>
    </footer>
  );
}