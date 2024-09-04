import Image from 'next/image';

export default function Home() {
  return (
    <div className="font-poppins text-gray-900">
      {/* Header */}
      <header className="fixed w-full top-0 left-0 bg-white shadow-md z-10">
        <div className="flex justify-between items-center p-4 max-w-7xl mx-auto">
          <div className="items-start">
            <Image src="/logo.png" alt="Logo Polije" width={200} height={200} />
          </div>
          <div className="flex items-center">
            <nav className="mr-10 space-x-5">
              <a href="#" className="text-gray-700 hover:text-blue-600">Beranda</a>
              <a href="#" className="text-gray-700 hover:text-blue-600">Blog</a>
              <a href="#" className="text-gray-700 hover:text-blue-600">FAQ</a>
            </nav>
            <button className="mr-4 border-blue-600 border-2 py-1 px-4 text-blue-600 hover:bg-blue-600 hover:text-white">Masuk</button>
            <button className="bg-blue-600 text-white py-1 px-4 hover:bg-blue-700">Daftar</button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="text-center bg-[#4D4DC8] text-white py-28 mt-10 relative">
        <div className="absolute inset-0">
          <Image
            src="/herosection-pattern.png"
            alt="Pattern Background"
            layout="fill"
            objectFit="cover"
            className="opacity-50"
          />
        </div>
        <div className="relative">
          <h1 className="text-4xl font-bold">Sederhanakan Rutinitas Bisnis Anda!</h1>
          <p className="mt-4">Sederhanakan Rutinitas Bisnis Anda!</p>
          <button className="text-[#4D4DC8] justify-center rounded-md text-sm ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-secondary text-secondary-foreground h-10 px-4 py-2 border-4 border-blue-200 hover:bg-blue-100 sm:h-12 sm:w-36 lg:h-14 lg:w-[11.4rem] lg:text-lg z-10 mx-auto flex items-center gap-1 font-bold shadow-md shadow-black-400 hover:text-blue mt-8 bg-white">Coba Gratis</button>
        </div>
      </section>

      {/* Apa yang Membuat Kami Berbeda Section */}
      <section className="text-center bg-white py-16">
        <h2 className="text-2xl font-semibold mb-6 text-[#4D4DC8]">APA YANG MEMBUAT KAMI BERBEDA</h2>
        <div className="grid grid-cols-2 gap-6 max-w-4xl mx-auto">
          <div className="bg-white border border-gray-300 shadow-lg h-80 rounded-md"></div>
          <div className="bg-white border border-gray-300 shadow-lg h-80 rounded-md"></div>
          <div className="bg-white border border-gray-300 shadow-lg h-80 rounded-md"></div>
          <div className="bg-white border border-gray-300 shadow-lg h-80 rounded-md"></div>
        </div>
      </section>

      {/* Mengenal Kami Lebih Dekat Section */}
      <section className="py-8 bg-[#4D4DC8] text-white relative">
        <div className="absolute inset-0">
          <Image
            src="/herosection-pattern.png"
            alt="Pattern Background"
            layout="fill"
            objectFit="cover"
            className="opacity-50"
          />
        </div>
        <div className="relative text-center mx-auto max-w-2xl">
          <h2 className="text-2xl font-semibold mb-6">MENGENAL KAMI LEBIH DEKAT</h2>
          <p className="max-w-2xl mx-auto mb-6 text-justify">
            Robota telah dipercaya oleh berbagai unit hotel dalam membantu mereka
            dalam melakukan monitoring, mendapatkan insight terhadap pengalaman
            pengguna, hingga melakukan perbandingan terhadap kompetitor dengan mudah.
          </p>
          <button className="text-[#4D4DC8] justify-center rounded-md text-sm ring-offset-background 
          transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring 
          focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-secondary 
          text-secondary-foreground h-10 px-4 py-2 border-4 border-blue-200 hover:bg-blue-100 
          sm:h-12 sm:w-36 lg:h-14 lg:w-[11.4rem] lg:text-lg z-10 mx-auto flex items-center gap-1 
          font-bold shadow-md shadow-black-400 hover:text-blue mt-4 mb-4 bg-white">Hubungi Kami</button>
        </div>
        <div className="mx-auto max-w-2xl bg-white">
          <video src=""></video>
          <Image src="/logo-polije.png" alt="video hotel" width={300} height={200} className="mx-auto" />
        </div>
      </section>

      {/* Keuntungan Menggunakan Robota Section */}
      <section className="bg-white text-center py-16">
        <h2 className="text-2xl font-semibold mb-6 text-[#4D4DC8]">KEUNTUNGAN MENGGUNAKAN ROBOTA</h2>
        <div className="grid grid-cols-3 gap-6 max-w-4xl mx-auto">
          <div className="bg-white border border-gray-300 shadow-lg h-40 rounded-md"></div>
          <div className="bg-white border border-gray-300 shadow-lg h-40 rounded-md"></div>
          <div className="bg-white border border-gray-300 shadow-lg h-40 rounded-md"></div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#4D4DC8] text-white text-center py-8">
        <p className="max-w-xl mx-auto">
          "Kami Berkomitmen Untuk Mendukung Peningkatan Usaha Di Bidang Pariwisata
          Dan Perhotelan Di Indonesia Dengan Cara Membantu Usaha Hotel Skala Kecil
          Dan Menengah Untuk Tetap Bisa Bersaing Di Dunia Digital"
        </p>
        <p className="mt-4">PT GLOBAL DATA INSPIRASI</p>
        <p className="mt-2">Jl. Cik di Tiro No.34, Tarban, Kec. Gondokusuman, Kota Yogyakarta, Daerah Istimewa Yogyakarta 55223</p>
        <p className="mt-2">&copy; 2024</p>
      </footer>
    </div>
  );
}