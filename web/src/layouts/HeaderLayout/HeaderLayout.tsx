type HeaderLayoutProps = {
  children?: React.ReactNode
}

const HeaderLayout = ({ children }: HeaderLayoutProps) => {
  return (
  <>
  <header className="bg-blue-500 py-4">
   <div className="container mx-auto">
        <nav className="flex items-center justify-between">
          <div className="text-white font-bold text-2xl">Your App Name</div>
          <ul className="flex space-x-4">
            <li className="text-white">Home</li>
            <li className="text-white">About</li>
            <li className="text-white">Services</li>
            <li className="text-white">Contact</li>
          </ul>
        </nav>
      </div>
  </header>
  <main>{children}</main>
  </>
  )

}

export default HeaderLayout
