interface Props {
  restaurant: {
    name: string
    body: string
    logo: string
    description: string
  }
}


const Restaurant = ({ restaurant } : Props) => {
  return (
    <div className="bg-gray-200 p-8 rounded-lg">
      <header className="flex justify-between">
      <h2 className="font-semibold text-gray-700">{restaurant.name}</h2>
      </header>
      <p className="text-sm mt-2">{restaurant.body}</p>
      <p className="text-sm mt-2">{restaurant.description}</p>
    </div>
  )
}

export default Restaurant
