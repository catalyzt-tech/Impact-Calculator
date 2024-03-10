import { FC } from 'react'

const Footer: FC = () => {
  return (
    <footer className="flex justify-center items-center h-20 w-full py-12 ">
      <p className="font-normal text-sm text-center">
        <span className="font-medium">
          © 2024 RetroPGF Hub - All right reserved{' '}
        </span>
        {/* <span>|</span> */}
        <div className="mt-1">Made with love by Catalyzt</div>
      </p>
    </footer>
  )
}

export default Footer
