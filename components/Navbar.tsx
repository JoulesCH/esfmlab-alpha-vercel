"use client";
import { Fragment, useEffect, useState } from 'react'
import { Popover, Transition } from '@headlessui/react'
import {
  BoltIcon,
  Bars3Icon,
  BookmarkSquareIcon,
  ChartBarIcon,
  ExclamationCircleIcon,
  LifebuoyIcon,
  PlayIcon,
  ArrowTrendingUpIcon,
  XMarkIcon,
  ArrowUpRightIcon,

} from '@heroicons/react/24/outline'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase/clientApp';
import { useRouter } from 'next/navigation';

const solutions = [
  {
    name: 'Raíces',
    description: 'Aproximar uno o varios ceros de funciones',
    href: '/raices',
    icon: BoltIcon,
    iconSVG: <svg viewBox="0 0 48 48" width='50' ><defs><path id="a" d="M0 .992h32.017V22H0z"></path></defs><g fill="none" fill-rule="evenodd"><path  fill="#FF6B3F" d="M24.014 13v10h-2.001v-1h-1v1h-3v-1h-1v1h-3v-1h-1v1h-5v1h16v11h1v-4h1v-1h-1v-3h1v-1h-1v-2h15v-1h-4v-1h-1v1h-3v-1h-1v1h-3v-1h-1v1h-2v-2h1v-1h-1v-3h1v-1h-1v-3z"></path><g transform="translate(8 13.015)"><path fill="#FF6B3F" d="M30.58.992c-.384.55-.73 1.1-1.064 1.631-2.097 3.332-3.908 6.21-13.934 6.744-6.587.35-10.477 3.666-12.58 6.385C.738 18.68.03 21.506 0 21.624L1.685 22c.006-.027.675-2.656 2.745-5.31 2.734-3.509 6.516-5.414 11.242-5.665 4.942-.263 8.392-1.098 10.86-2.628 2.246-1.392 3.374-3.185 4.465-4.919a40.02 40.02 0 0 1 1.02-1.565L30.58.993z"></path></g></g></svg>,
  },
  {
    name: 'Integración Numérica',
    description: 'Obtener el área bajo la curva',
    href: '/IntegracionNumerica',
    icon: ChartBarIcon,
    iconSVG: <svg  viewBox="0 0 48 48" width='50'><defs><path id="a" d="M0 0h36.213v21.25H0z"></path></defs><g fill="none" fill-rule="evenodd" transform="translate(5 13)"><path fill="#FF6B3F" d="M8.065.989c0-.572-.525-.99-1.203-.99-2.36 0-3.89 2.66-3.846 8.176l.11 8.658c.043 2.637-.197 3.164-.7 3.164-.46 0-.765-.835-1.486-.835a.954.954 0 0 0-.94.967c0 .593.524 1.12 1.333 1.12 2.514 0 3.934-2.9 3.825-9.756l-.087-7.054c-.044-2.857.219-3.319.699-3.319.524 0 .546.792 1.311.792.547 0 .984-.374.984-.923zm20.64 10.54c-.402.733-1.52 2.099-2.075 2.099-.2 0-.365-.266-.365-.81 0-.999.44-2.68 1.233-3.263.177-.138.365-.201.641-.201.315 0 .717.138.944.353l-.378 1.821zm6.401-1.72c.126 0 .227.063.29.151.075.076.138.128.226.128.239 0 .578-.292.59-.671.013-.33-.187-.633-.578-.633-.553 0-1.056.48-2.037 1.91l-.213-.632c-.278-.835-.454-1.278-.844-1.278-.452 0-1.081.556-1.71 1.455l.264.304c.403-.532.63-.684.754-.684.114 0 .227.114.44.81l.366 1.2c-.68 1.05-1.22 1.657-1.522 1.657a.375.375 0 0 1-.302-.126.363.363 0 0 0-.116-.095.124.124 0 0 1 .017-.019l-.19-.328c-.339.34-.704.58-.83.58-.1 0-.112-.125-.037-.48.428-2.34.893-4.615 1.459-7.08.075-.304.05-.405-.088-.405-.227 0-.981.328-2.176.442l-.063.38.29.012c.565 0 .64.063.528.62l-.366 1.858c-.301-.101-.49-.101-.703-.101-.566 0-1.648.468-2.264.987-.906.772-1.447 2.111-1.447 3.313 0 1.037.428 1.568.93 1.568.379 0 .794-.215 1.221-.557a8.485 8.485 0 0 0 1.522-1.555h.025l-.176.91c-.214 1.012.012 1.202.314 1.202.265 0 .792-.217 1.348-.668-.005.396.278.668.626.668.642 0 1.145-.607 2.164-2.264l.326 1.063c.252.847.528 1.2.918 1.2.454 0 1.12-.416 1.799-1.504l-.24-.29c-.427.505-.703.733-.88.733-.163 0-.339-.304-.515-.923l-.465-1.493c.264-.391.528-.695.741-.935.265-.292.454-.43.604-.43zM22.581 5.522l-.34.266c.78 1.024 1.031 2.719.968 4.109-.062 2.478-1.093 5.059-2.98 6.399l.227.329c2.2-1.05 3.785-3.592 3.835-6.487.076-1.784-.49-3.617-1.71-4.616zm-1.42 7.625l-.24-.29c-.428.505-.704.733-.88.733-.163 0-.34-.304-.516-.923l-.465-1.493c.264-.391.528-.695.742-.935.264-.292.453-.43.603-.43.126 0 .227.063.29.151.075.076.138.128.227.128.238 0 .577-.292.59-.671.013-.33-.188-.633-.578-.633-.553 0-1.056.48-2.038 1.91l-.213-.632c-.277-.835-.453-1.278-.843-1.278-.453 0-1.082.556-1.71 1.455l.263.304c.403-.532.63-.684.755-.684.114 0 .226.114.44.81l.365 1.2c-.679 1.05-1.22 1.657-1.522 1.657a.373.373 0 0 1-.301-.126c-.063-.076-.139-.127-.226-.127-.252 0-.579.292-.579.696-.012.404.276.683.628.683.642 0 1.145-.607 2.164-2.264l.326 1.063c.252.847.529 1.2.92 1.2.452 0 1.118-.416 1.797-1.504zM16.958 5.85l-.225-.329c-2.202 1.062-3.862 3.655-3.862 6.74 0 1.606.554 3.364 1.749 4.363l.339-.266c-.78-1.037-.993-2.617-.993-3.87 0-2.63 1.106-5.298 2.992-6.638zm-4.665.38c.251 0 .529.214.843.58.1.115.214.102.327.026.163-.1.402-.367.415-.645.013-.278-.301-.62-.855-.62-.503 0-1.296.354-1.95 1.025-.59.607-.893 1.378-1.119 2.39h-.767l-.415.43.05.138h1.02c-.215 1.24-.378 2.378-.68 4.123-.365 2.163-.554 2.644-.654 2.82-.1.19-.252.29-.452.29-.252 0-.692-.176-.92-.403-.087-.063-.162-.052-.263.025-.201.151-.402.404-.402.657-.013.304.427.582.817.582.365 0 .855-.215 1.396-.709.805-.733 1.346-1.606 1.81-3.717.328-1.429.48-2.428.692-3.668l1.284-.1.276-.468H11.3c.39-2.44.68-2.77.993-2.757z"></path></g></svg>,
  },
  {
    name: 'Optimización Lineal',
    description: "Métodos como Simplex, gran M y dos fases",
    href: '#',
    icon: ArrowUpRightIcon,
    iconSVG: <svg className="mr-3" viewBox="0 0 45 45" width='35' height='50'><g fill="#FF6B3F"><circle cx="16.5" cy="3.5" r="3.5"></circle><circle cy="7.5" cx="33.5" r="3.5"></circle><circle cy="22.5" cx="8.5" r="3.5"></circle><circle cx="10.5" cy="48.5" r="3.5"></circle><circle cy="39.5" cx="30.5" r="3.5"></circle></g><g opacity="0.5" fill="none" stroke="#FF6B3F" stroke-width="1.5"><path d="M16.5 3.5l17 4-3 32-20 9-2-26z"></path><path d="M10.5 48.5l6-45 14 36-22-17 25-15z"></path></g></svg>
  },
  {
    name: 'Optimización No Lineal',
    description: 'Alch no sé ni la he cursado pero descenso de gradiente y eso',
    href: '#',
    icon: ArrowTrendingUpIcon,
    iconSVG: <svg  viewBox="0 0 48 48" width='50'><defs><path id="a" d="M0 0h30v15.429H0z"></path></defs><g fill="none" fill-rule="evenodd" transform="translate(7 15)"><path  fill="#FF6B3F" d="M10.728 4.412c-1.043 0-2.063 1-4.078 3.839l-.412-1.288c-.559-1.67-.898-2.551-1.578-2.551-.825 0-1.917 1.025-3.01 2.575l.438.5c.85-1.048 1.31-1.334 1.529-1.334.242 0 .46.309.824 1.502l.802 2.432c-1.48 2.146-2.573 3.458-3.253 3.458a.717.717 0 0 1-.558-.239c-.12-.143-.243-.238-.412-.238-.461 0-.995.549-1.02 1.168 0 .692.51 1.193 1.14 1.193 1.19 0 2.257-1.169 4.37-4.436l.703 2.218c.486 1.526 1.02 2.218 1.675 2.218.85 0 2.015-.858 3.18-2.647l-.437-.5c-.777.905-1.36 1.382-1.724 1.382-.363 0-.728-.668-1.165-2.05l-.8-2.528c.509-.74 1.043-1.36 1.529-1.908.582-.716 1.043-1.073 1.358-1.073.243 0 .438.119.56.286.144.143.242.215.388.215.388 0 .995-.501.995-1.121.024-.549-.365-1.073-1.044-1.073zm8.909 5.68h3.415v-1.68h-3.415v1.68zm8.057 2.284V0c-1.48.525-2.985.978-4.539 1.24v.573l1.19.071c1.043.047 1.165.167 1.165 1.407v9.085c0 1.717-.17 1.931-2.306 2.099v.667H30v-.667c-2.135-.168-2.306-.382-2.306-2.099zM16.079 7.362h-2.302l1.695-1.581c1.398-1.304 1.977-2.165 1.977-3.261 0-1.54-1.172-2.469-2.571-2.469-.889 0-1.595.347-2.132.861l-.903 1.303.409.333c.466-.652 1.045-1.235 1.892-1.235.975 0 1.483.694 1.483 1.652 0 1.054-.565 2.095-1.554 3.246-.692.805-1.51 1.568-2.258 2.29v.36h5.662c.155-.583.324-1.457.55-2.262l-.465-.167c-.523.903-.636.93-1.483.93z"></path></g></svg>,
  },
]
const callsToAction = [
  { name: 'Mirar demo', href: '#', icon: PlayIcon },
  { name: 'Reportar error', href: '#', icon: ExclamationCircleIcon },
]
const resources = [
  {
    name: 'Club de Programación ESFM',
    description: 'Conoce a los miembros del club y sus proyectos',
    href: '#',
    icon: LifebuoyIcon,
  },
  {
    name: 'Material bibliográfico',
    description: 'Enlaces a libros y artículos de interés',
    href: '#',
    icon: BookmarkSquareIcon,
  },
]
const recentPosts = [
  { id: 1, name: 'Post 1', href: '#' },
  { id: 2, name: 'Post 2', href: '#' },
  { id: 3, name: 'Post 3', href: '#' },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Navbar() {
  const [user, loading, error] = useAuthState(auth);
  const [user_logged, setUser] = useState(false);
  const [user_name, setUserName] = useState('');
  const [verify_email, setVerifyEmail] = useState(<></>);
  
  const router = useRouter();

  useEffect(() => {
    if (user) {
        setUser(true);
        setUserName(user.displayName);
        // if user has verified email
        if (!user.emailVerified) {
          setVerifyEmail(
            <div id="alert-border-2" className="flex p-4 mb-4 bg-red-100 border-t-4 border-red-500 dark:bg-red-200" role="alert">
              <ExclamationCircleIcon className="flex-shrink-0 w-5 h-5 text-red-700" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" />
              <div className="ml-3 text-sm font-medium text-red-700">
                Por favor verifica tu correo electrónico.
              </div>
            </div>
          );
        }
    }
  }, [user]); 

  return (
    <div>
    <Popover className="relative z-30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex items-center justify-between border-b-2 border-gray-100 py-3  md:justify-start md:space-x-10">
          <div className="flex justify-start ">
            <a href="/">
              <span className="sr-only">ESFMlab</span>
              <img
                className="h-8 w-auto sm:h-10"
                src="/esfmlab-ico.png"
                alt=""
              />
            </a>
          </div>
          <div className="-my-2 -mr-2 md:hidden">
            <Popover.Button className="inline-flex items-center justify-center rounded-md  p-2 text-gray-400  hover:text-gray-500 focus:outline-none ">
              <span className="sr-only">Open menu</span>
              <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            </Popover.Button>
          </div>
          <Popover.Group as="nav" className="hidden space-x-10 md:flex">
            <Popover className="relative">
              {({ open }) => (
                <>
                  <Popover.Button
                    className={classNames(
                      open ? 'text-gray-900' : 'text-gray-500',
                      'group inline-flex items-center rounded-md  text-base font-medium hover:text-gray-900 focus:outline-none'
                    )}
                  >
                    <span>Soluciones</span>
                    <ChevronDownIcon
                      className={classNames(
                        open ? 'text-gray-600' : 'text-gray-400',
                        'ml-2 h-5 w-5 group-hover:text-gray-500'
                      )}
                      aria-hidden="true"
                    />
                  </Popover.Button>

                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-200"
                    enterFrom="opacity-0 translate-y-1"
                    enterTo="opacity-100 translate-y-0"
                    leave="transition ease-in duration-150"
                    leaveFrom="opacity-100 translate-y-0"
                    leaveTo="opacity-0 translate-y-1"
                  >
                    <Popover.Panel className="absolute z-10 -ml-4 mt-3 w-screen max-w-md transform px-2 sm:px-0 lg:left-1/2 lg:ml-0 lg:-translate-x-1/2">
                      <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                        <div className="relative grid gap-6 bg-white px-5 py-6 sm:gap-8 sm:p-8">
                          {solutions.map((item) => (
                            <a
                              key={item.name}
                              href={item.href}
                              className="-m-3 flex items-start rounded-lg p-3 hover:bg-gray-50"
                            >
                              {item.iconSVG}
                              {/* <item.icon className="h-6 w-6 flex-shrink-0 text-amber-600" aria-hidden="true" /> */}
                              <div className="ml-4">
                                <p className="text-base font-medium text-gray-900">{item.name}</p>
                                <p className="mt-1 text-sm text-gray-500">{item.description}</p>
                              </div>
                            </a>
                          ))}
                        </div>
                        <div className="space-y-6 bg-gray-50 px-5 py-5 sm:flex sm:space-y-0 sm:space-x-10 sm:px-8">
                          {callsToAction.map((item) => (
                            <div key={item.name} className="flow-root">
                              <a
                                href={item.href}
                                className="-m-3 flex items-center rounded-md p-3 text-base font-medium text-gray-900 hover:bg-gray-100"
                              >
                                <item.icon className="h-6 w-6 flex-shrink-0 text-gray-400" aria-hidden="true" />
                                <span className="ml-3">{item.name}</span>
                              </a>
                            </div>
                          ))}
                        </div>
                      </div>
                    </Popover.Panel>
                  </Transition>
                </>
              )}
            </Popover>

            <a href="/forum" className="text-base font-medium text-gray-500 hover:text-gray-900">
              Foro
            </a>
            <a href="#" className="text-base font-medium text-gray-500 hover:text-gray-900">
              Docs
            </a>

            <Popover className="relative">
              {({ open }) => (
                <>
                  <Popover.Button
                    className={classNames(
                      open ? 'text-gray-900' : 'text-gray-500',
                      'group inline-flex items-center rounded-md text-base font-medium hover:text-gray-900 focus:outline-none '
                    )}
                  >
                    <span>Más</span>
                    <ChevronDownIcon
                      className={classNames(
                        open ? 'text-gray-600' : 'text-gray-400',
                        'ml-2 h-5 w-5 group-hover:text-gray-500'
                      )}
                      aria-hidden="true"
                    />
                  </Popover.Button>

                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-200"
                    enterFrom="opacity-0 translate-y-1"
                    enterTo="opacity-100 translate-y-0"
                    leave="transition ease-in duration-150"
                    leaveFrom="opacity-100 translate-y-0"
                    leaveTo="opacity-0 translate-y-1"
                  >
                    <Popover.Panel className="absolute left-1/2 z-10 mt-3 w-screen max-w-md -translate-x-1/2 transform px-2 sm:px-0">
                      <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                        <div className="relative grid gap-6 bg-white px-5 py-6 sm:gap-8 sm:p-8">
                          {resources.map((item) => (
                            <a
                              key={item.name}
                              href={item.href}
                              className="-m-3 flex items-start rounded-lg p-3 hover:bg-gray-50"
                            >
                              <item.icon className="h-6 w-6 flex-shrink-0 text-amber-600" aria-hidden="true" />
                              <div className="ml-4">
                                <p className="text-base font-medium text-gray-900">{item.name}</p>
                                <p className="mt-1 text-sm text-gray-500">{item.description}</p>
                              </div>
                            </a>
                          ))}
                        </div>
                        <div className="bg-gray-50 px-5 py-5 sm:px-8 sm:py-8">
                          <div>
                            <h3 className="text-base font-medium text-gray-500">Publicaciones del foro destacadas</h3>
                            <ul role="list" className="mt-4 space-y-4">
                              {recentPosts.map((post) => (
                                <li key={post.id} className="truncate text-base">
                                  <a href={post.href} className="font-medium text-gray-900 hover:text-gray-700">
                                    {post.name}
                                  </a>
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div className="mt-5 text-sm">
                            <a href="#" className="font-medium text-amber-600 hover:text-amber-500">
                              Ir al foro
                              <span aria-hidden="true"> &rarr;</span>
                            </a>
                          </div>
                        </div>
                      </div>
                    </Popover.Panel>
                  </Transition>
                </>
              )}
            </Popover>
          </Popover.Group>
          {!user_logged? (
            <div className="hidden items-center justify-end md:flex md:flex-1 lg:w-0">
              <a href="/login" className="whitespace-nowrap text-base font-medium text-gray-500 hover:text-gray-900">
                Acceder
              </a>
              <a
                href="/signup"
                className="ml-8 inline-flex items-center justify-center whitespace-nowrap rounded-md border border-transparent bg-amber-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-amber-500"
              >
                Crear cuenta
              </a>
            </div>
          ):(
            <div className="hidden items-center justify-end md:flex md:flex-1 lg:w-0">
              {user_name}
              <button
                onClick={() => {auth.signOut(); setUser(false); router.push('/login');}}
                className="ml-8 inline-flex items-center justify-center whitespace-nowrap rounded-md border border-transparent bg-amber-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-amber-500"
              >
                Cerrar sesión
              </button>
            </div>
          )}

        </div>
      </div>

      <Transition
        as={Fragment}
        enter="duration-200 ease-out"
        enterFrom="opacity-0 scale-95"
        enterTo="opacity-100 scale-100"
        leave="duration-100 ease-in"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-95"
      >
        <Popover.Panel focus className="absolute inset-x-0 top-0 origin-top-right transform p-2 transition md:hidden">
          <div className="divide-y-2 divide-gray-50 rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
            <div className="px-5 pt-5 pb-6">
              <div className="flex items-center justify-between">
                <div>
                  ESFMLAB LOGO 
                </div>
                <div className="-mr-2">
                  <Popover.Button className="inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none ">
                    <span className="sr-only">Close menu</span>
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </Popover.Button>
                </div>
              </div>
              <div className="mt-6">
                <nav className="grid gap-y-8">
                  {solutions.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className="-m-3 flex items-center rounded-md p-3 hover:bg-gray-50"
                    >
                      <item.icon className="h-6 w-6 flex-shrink-0 text-amber-600" aria-hidden="true" />
                      <span className="ml-3 text-base font-medium text-gray-900">{item.name}</span>
                    </a>
                  ))}
                </nav>
              </div>
            </div>
            <div className="space-y-6 py-6 px-5">
              <div className="grid grid-cols-2 gap-y-4 gap-x-8">
                <a href="#" className="text-base font-medium text-gray-900 hover:text-gray-700">
                  Foro
                </a>

                <a href="#" className="text-base font-medium text-gray-900 hover:text-gray-700">
                  Docs
                </a>
                {resources.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="text-base font-medium text-gray-900 hover:text-gray-700"
                  >
                    {item.name}
                  </a>
                ))}
              </div>
              <div>
                <a
                  href="#"
                  className="flex w-full items-center justify-center rounded-md border border-transparent bg-amber-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-amber-700"
                >
                  Crear cuenta
                </a>
                <p className="mt-6 text-center text-base font-medium text-gray-500">
                  ¿Ya tienes una cuenta?{' '}
                  <a href="#" className="text-amber-600 hover:text-amber-500">
                    Accede aquí
                  </a>
                </p>
              </div>
            </div>
          </div>
        </Popover.Panel>
      </Transition>
    </Popover>
    {verify_email}
    </div>
  )
}