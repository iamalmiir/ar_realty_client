const MobileMenuDropDown = ({
  Disclosure,
  navigation,
  userNavigation,
  user,
  Link,
  links,
  isLoading,
  logoutUser,
  classNames,
}) => {
  return (
    <Disclosure.Panel as='nav' className='lg:hidden' aria-label='Global'>
      <div className='pt-2 pb-3 px-2 space-y-1'>
        {navigation.map((path) => (
          <Link key={path.name} href={path.href}>
            <Disclosure.Button
              as='a'
              href='#'
              className={classNames(
                path.current
                  ? 'bg-gray-900 text-white'
                  : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                'block rounded-md py-2 px-3 text-base font-medium'
              )}
              aria-current={path.current ? 'page' : undefined}>
              {path.name}
            </Disclosure.Button>
          </Link>
        ))}
      </div>
      {!isLoading && user ? (
        <div className='border-t border-gray-700 pt-4 pb-3'>
          <div className='px-4 flex items-center'>
            <div className='flex-shrink-0'>
              <img
                className='h-10 w-10 rounded-full'
                width={40}
                height={40}
                src={user.avatar || user.default_avatar}
                alt={user.full_name}
              />
            </div>
            <div className='ml-3'>
              <div className='text-base font-medium text-white'>
                {user.name}
              </div>
              <div className='text-sm font-medium text-gray-400'>
                {user.email}
              </div>
            </div>
          </div>
          <div className='mt-3 px-2 space-y-1'>
            {userNavigation.map((path) => (
              <Link key={path.name} href={path.href}>
                <Disclosure.Button
                  key={path.name}
                  onClick={path.name === 'Sign out' ? logoutUser : null}
                  as='a'
                  href={path.href}
                  className='block rounded-md py-2 px-3 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white'>
                  {path.name}
                </Disclosure.Button>
              </Link>
            ))}
          </div>
        </div>
      ) : (
        <div className='border-t border-gray-700 pt-4 ml-3 pb-3'>
          <Link href={links.login}>
            <Disclosure.Button
              as='a'
              href='#'
              className='block rounded-md py-2 px-3 text-base font-medium text-accentDark hover:bg-gray-700 hover:text-white'>
              Login
            </Disclosure.Button>
          </Link>
        </div>
      )}
    </Disclosure.Panel>
  )
}

export default MobileMenuDropDown
