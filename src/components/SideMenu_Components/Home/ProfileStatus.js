function ProfileStatus({ posts, feeds }) {
  return (
    <div className="flex flex-col space-y-5 border border-gray-300 p-2 pl-3 mr-10 w-80">
      <div className="text-md font-medium text-gray-600">
        Feeds:{" "}
        <span className="ml-2 w-max px-3 py-1 text-medium text-cyan-600 font-semibold rounded-full border border-cyan-700 focus:outline-none focus:ring-2 focus:ring-cyan-600 focus:ring-offset-2">
          {feeds}
        </span>
      </div>
      <div className="text-md font-medium text-gray-600">
        Posts:{" "}
        <span className="ml-3 w-max px-3 py-1 text-medium text-cyan-600 font-semibold rounded-full border border-cyan-700 focus:outline-none focus:ring-2 focus:ring-cyan-600 focus:ring-offset-2">
          {posts}
        </span>
      </div>
    </div>
  );
}

export default ProfileStatus;
