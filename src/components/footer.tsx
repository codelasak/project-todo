
export function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-4">
      <div className="container mx-auto text-center">
        <p>&copy; {new Date().getFullYear()} Fennaver. Tüm hakları saklıdır.</p>
      </div>
    </footer>
  );
}