export default function DateDivider({ date }) {
  return (
    <div className="my-4 text-center relative">
      <hr className="border-gray-300" />
      <span className="absolute left-1/2 top-0 transform -translate-x-1/2 -translate-y-1/2 bg-gray-50 px-3 text-sm text-gray-600">
        {date}
      </span>
    </div>
  );
}
