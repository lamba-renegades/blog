import Image from 'next/image';

const NavBar = () => (
  <>
    <header className="bg-black border-b md:flex md:items-center md:justify-between px-16 shadow-lg md:py-3">
      <div className="flex items-center justify-between mb-4 md:mb-0">
        <Image
          src="/logo.png"
          alt="Lambda Renegades Logo"
          width={50}
          height={50}
        />
      </div>
      {/* end Logo */}

      <nav>
        <ul className="list-reset md:flex md:items-center text-white text-2xl">
          <li className="md:ml-4">
            <a
              className="block no-underline hover:underline py-2 black md:border-none md:p-0"
              href="#"
            >
              Posts
            </a>
          </li>
          <li className="md:ml-4">
            <a
              className="border-t block no-underline hover:underline py-2 md:border-none md:p-0"
              href="#"
            >
              About
            </a>
          </li>
          <li className="md:ml-4">
            <a
              className="border-t block no-underline hover:underline py-2 md:border-none md:p-0"
              href="#"
            >
              Contact
            </a>
          </li>
        </ul>
      </nav>
      {/* end global navigation */}
    </header>
  </>
);

export default NavBar;
