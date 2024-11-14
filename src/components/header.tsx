export function Header() {
  return (
    <header className="bg-purple-600 text-white py-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">Fennaver Yapılcaklar Listesi</h1>
        <nav>
          <ul className="flex space-x-4">
            <li><a href="#" className="hover:underline">Ana Sayfa</a></li>
            <li><a href="#" className="hover:underline">Hakkında</a></li>
            <li><a href="#" className="hover:underline">İletişim</a></li>
          </ul>
        </nav>
      </div>
    </header>
  );
}