import ListingCard from '../components/listing-card/ListingCard'

const Home = () => {
  return (
    <>
      <h1 className="text-3xl font-bold text-center my-8">
        Streetside Marketplace
      </h1>

      <div className="container mx-auto px-4">
        {/* Grid layout for listings */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          <ListingCard />
          <ListingCard />
          <ListingCard />
          <ListingCard />
          <ListingCard />
          <ListingCard />
        </div>
      </div>
    </>
  )
}

export default Home
