import Image from 'next/image'
const people = [
    {
      name: 'Maartens Heynike',
      role: 'CEO & Attorney',
      imageUrl: "/assets/images/francios.jpeg",
      alt: 'Picture of Maartens, the owner and CEO',
    },
    {
      name: 'Daniel Heynike',
      role: 'Operations Manager',
      imageUrl: "/assets/images/vanessa.jpeg",
      alt: 'Picture of Vanessa, the head of treatment',
    },
    {
      name: 'Malanie Heynike',
      role: 'Partner',
      imageUrl: "/assets/images/brenda.jpeg",
      alt: 'Picture of Brenda, the head of nursing',
    },
    {
      name: 'Merle Capotis',
      role: 'Chief Admin Officer',
      imageUrl: "/assets/images/bianca.jpeg",
      alt: 'Picture of Bianca, the lead counsellor',
    },
    {
        name: 'Pauline Madlala',
        role: 'Conveyancing Assistant',
        imageUrl: "/assets/images/pauline.jpeg",
        alt: 'Picture of Pauline, the conveyancing assistant',
    },
    {
        name: 'Sandra Denice Jacobs',
        role: 'Head of Debt Collection',
        imageUrl: "/assets/images/sandra.jpeg",
        alt: 'Picture of Sandra, the head of debt collection',
    }
    // More people...
  ]
  
  export default function Team() {
    return (
      <div className="bg-white py-24 sm:py-32">
        <div className="mx-auto grid max-w-7xl gap-x-8 gap-y-20 px-6 lg:px-8 xl:grid-cols-3">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Meet our leadership</h2>
            <p className="mt-6 text-lg leading-8 text-gray-600">
            Our team consists of highly skilled and experienced legal professionals who are dedicated to providing exceptional service and passionate about helping clients achieve their legal goals.
            </p>
          </div>
          <ul role="list" className="grid gap-x-8 gap-y-12 sm:grid-cols-2 sm:gap-y-16 xl:col-span-2">
            {people.map((person) => (
              <li key={person.name}>
                <div className="flex items-center gap-x-6">
                  <Image className="h-28 w-28 rounded-full" src={person.imageUrl} alt={person.alt} width={500} height={500}/>
                  <div>
                    <h3 className="text-base font-semibold leading-7 tracking-tight text-gray-900">{person.name}</h3>
                    <p className="text-sm font-semibold leading-6 text-indigo-600">{person.role}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    )
  }
  