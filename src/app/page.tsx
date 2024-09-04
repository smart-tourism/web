import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="font-poppins text-gray-900">
      {/* Header */}
      <header className="fixed w-full top-0 left-0 bg-white shadow-md z-10">
        <div className="flex justify-between items-center p-4 max-w-9xl mx-auto">
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
            <Link href="/auth/signup">
            <button className="bg-blue-600 text-white py-1 px-4 hover:bg-blue-700">Daftar</button>
            </Link>
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
        <div className="relative mx-auto mt-32 w-full md:mt-16 md:flex md:h-1/3 md:flex-col md:items-center md:justify-center">
          <div className="mx-auto flex w-full max-w-5xl flex-col items-center gap-2 text-white">
            <h1 className="text-center text-2xl font-black uppercase tracking-wider sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl">SEDERHANAKAN RUTINITAS BISNIS ANDA!</h1>
            <p className="mt-8 text-center text-sm sm:text-base md:text-lg lg:text-xl">Sederhanakan Rutinitas Bisnis Anda!</p>
          </div>
          <div className="mt-16 flex w-full justify-center">
            <button className="text-[#4D4DC8] justify-center rounded-md text-sm ring-offset-background transition-colors 
            focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 
            disabled:pointer-events-none disabled:opacity-50 bg-secondary text-secondary-foreground h-10 px-4 
            py-2 border-4 border-blue-200 hover:bg-blue-100 sm:h-12 sm:w-36 lg:h-14 lg:w-[11.4rem] 
            lg:text-lg mx-auto flex items-center gap-1 font-bold shadow-md shadow-black-400 hover:text-blue 
            mt-8 bg-white">Coba Gratis</button>
          </div>
        </div>
      </section>

      {/* Apa yang Membuat Kami Berbeda Section */}
      <section className="text-center bg-white py-16">
        <h2 className="text-4xl font-bold mb-6 text-[#4D4DC8]">APA YANG MEMBUAT KAMI BERBEDA</h2>
        <div className="grid grid-cols-2 sm:grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
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
          <video src="" className="mx-auto"></video>
        </div>
      </section>

      {/* Keuntungan Menggunakan Robota Section */}
      <section className="bg-white text-center py-16">
        <h1 className="text-4xl font-bold mb-6 text-[#4D4DC8]">KEUNTUNGAN MENGGUNAKAN ROBOTA</h1>
        <div className="grid grid-flow-row-dense grid-cols-3 grid-rows-auto sm:grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <div className="bg-white border border-gray-300 shadow-md shadow-[#4D4DC8] h-96 rounded-lg p-4">
            <img src="/keuntungan1.png" alt="Keuntungan 1" className="w-[12rem] sm:w-[16rem]" />
            <p className="text-lg font-medium">Mudah Memantau informasi dari berbagai OTA dalam SATU PLATFORM saja</p>
          </div>
          <div className="bg-white border border-gray-300 shadow-md shadow-[#4D4DC8] h-96 rounded-lg p-4">
            <img src="/keuntungan2.png" alt="Keuntungan 2" className="w-[12rem] sm:w-[16rem]" />
            <p className="text-lg font-medium">Melihat berbagai ulasan dari tamu tentang reputasi hotel anda dari berbagai aspek</p>
          </div>
          <div className="bg-white border border-gray-300 shadow-md shadow-[#4D4DC8] h-96 rounded-lg p-4">
            <img src="/keuntungan3.png" alt="Keuntungan 3" className="w-[12rem] sm:w-[16rem]"/>
            <p className="text-lg font-medium">Meningkatkan produktivitas dalam mengelola ulasan tamu di OTA</p>
          </div>
        </div>
        <h2 className="text-3xl mt-12 font-bold text-[#4D4DC8]">PENGGUNA TERPERCAYA</h2>
        
        <div className="h-40 w-80 mx-auto">
          <img src="/mgm.png" alt="mgm image" className="" />
        </div>
        <p className="font-poppins font-medium">PT Metropolitan Golden Management (MGM)</p>
      </section>

      {/* Kata - Kata */}
      <section className="bg-[#4D4DC8] text-white text-center py-8">
        <p className="text-lg font-bold max-w-xl mx-auto">
          "Kami Berkomitmen Untuk Mendukung Peningkatan Usaha Di Bidang Pariwisata
          Dan Perhotelan Di Indonesia Dengan Cara Membantu Usaha Hotel Skala Kecil
          Dan Menengah Untuk Tetap Bisa Bersaing Di Dunia Digital"
        </p>
      </section>

      {/* Footer */}
      <footer className="bg-white py-8">
        <div className="grid grid-flow-row-dense grid-cols-2">
          <div className="px-4">
          <img src="/logo.png" alt="Logo Polije" width={250} height={250} className="items-start" />
          </div>
          
          <div className="text-end px-4">
            <p className="text-xl font-bold">PT GLOBAL DATA INSPIRASI</p>
            <p className="">Jl. Cik di Tiro No.34, Tarban, Kec. Gondokusuman, Kota Yogyakarta, Daerah Istimewa Yogyakarta 55223</p>
          </div>
        </div>
      </footer>
      <div className="bg-[#4D4DC8] text-center py-2 text-white">
          <p className="">&copy;copyright 2024</p>
      </div>
    </div>
  );
}