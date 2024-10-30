export default function Details({ name, contact, city }) {
  return (
      <div>
          <div className="px-4 sm:px-0">
              <h3 className="text-center text-3xl font-semibold leading-7 text-gray-900">Restaurant Information</h3>
          </div>
          <div className="mt-6 border-t border-gray-100 text-center">
              <dl className="divide-y divide-gray-100">
                  <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                      <dt className="font-medium leading-6 text-gray-900 text-lg">Name of the Restaurant</dt>
                      <dd className="mt-1 leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{name}</dd>
                  </div>
                  <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                      <dt className="font-medium leading-6 text-gray-900 text-lg">Contact Details</dt>
                      <dd className="mt-1 leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{contact}</dd>
                  </div>
                  <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                      <dt className="font-medium leading-6 text-gray-900 text-lg">Address</dt>
                      <dd className="mt-1 leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{city}</dd>
                  </div>
              </dl>
          </div>
      </div>
  );
}
