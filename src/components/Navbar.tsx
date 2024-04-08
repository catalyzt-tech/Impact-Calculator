import { FC } from 'react'
import { Link } from 'react-router-dom'
import { ConnectButton } from '@rainbow-me/rainbowkit'

const Navbar: FC = () => {
  return (
    <nav className="flex flex-row items-center justify-between bg-base-100 h-20 px-16">
      <div className="">
        <Link to="/" className="flex flex-row font-semibold text-xs  ">
          <img src="img/retropgfhub2.svg" alt="catalyzt" className="w-40" />
        </Link>
      </div>
      <div className="hidden lg:flex">
        <ul className="flex px-1 buttom font-[450] opacity-60 ">
          <li className="hover:bg-slate-200 px-4 py-1.5 rounded-lg transition ease-in-out duration-200 active:scale-90">
            <Link to="/">Home</Link>
          </li>
          <li className="hover:bg-slate-200 px-4 py-1.5 rounded-lg transition ease-in-out duration-200 active:scale-90">
            <Link to="/category">Browse</Link>
          </li>
        </ul>
      </div>
      {/* //default connect button
      <ConnectButton
        label="Connect Wallet"
        showBalance={false}
        chainStatus="none"
        // accountStatus="address"
      /> */}
      <ConnectButton.Custom>
        {({
          account,
          chain,
          openAccountModal,
          openChainModal,
          openConnectModal,
          authenticationStatus,
          mounted,
        }) => {
          // Note: If your app doesn't use authentication, you
          // can remove all 'authenticationStatus' checks
          const ready = mounted && authenticationStatus !== 'loading'
          const connected =
            ready &&
            account &&
            chain &&
            (!authenticationStatus || authenticationStatus === 'authenticated')

          return (
            <div
              {...(!ready && {
                'aria-hidden': true,
                style: {
                  opacity: 0,
                  pointerEvents: 'none',
                  userSelect: 'none',
                },
              })}
            >
              {(() => {
                if (!connected) {
                  return (
                    <button
                      onClick={openConnectModal}
                      type="button"
                      className="border bg-[#ff0420] text-white font-[450] px-4 py-2 rounded-badge flex flex-row justify-center items-center gap-3 active:scale-95 transition ease-in-out duration-150"
                    >
                      Connect Wallet
                    </button>
                  )
                }

                if (chain.unsupported) {
                  return (
                    <button onClick={openChainModal} type="button">
                      Wrong network
                    </button>
                  )
                }

                return (
                  <div>
                    {/* <button
                      onClick={openChainModal}
                      style={{ display: 'flex', alignItems: 'center' }}
                      type="button"
                    >
                      {chain.hasIcon && (
                        <div
                          style={{
                            background: chain.iconBackground,
                            width: 12,
                            height: 12,
                            borderRadius: 999,
                            overflow: 'hidden',
                            marginRight: 4,
                          }}
                        >
                          {chain.iconUrl && (
                            <img
                              alt={chain.name ?? 'Chain icon'}
                              src={chain.iconUrl}
                              style={{ width: 12, height: 12 }}
                            />
                          )}
                        </div>
                      )}
                      {chain.name}
                    </button> */}

                    <button
                      onClick={openAccountModal}
                      type="button"
                      className="border px-3.5 py-2 rounded-badge flex flex-row justify-center items-center gap-3 active:scale-95 transition ease-in-out duration-150"
                    >
                      {account.ensAvatar ? (
                        <img
                          src={account.ensAvatar}
                          alt="avatar"
                          width={25}
                          className="rounded-full"
                        />
                      ) : (
                        <img
                          src="img/small_sunny.svg"
                          alt="sunny"
                          width={25}
                          className="rounded-full"
                        />
                      )}
                      {account.displayName}
                    </button>
                  </div>
                )
              })()}
            </div>
          )
        }}
      </ConnectButton.Custom>
    </nav>
  )
}

export default Navbar
