export default function CartItem({ UpdateQuantity, count, price, product }) {
  return (
    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
      <td className="p-4">
        <img
          src={product?.imageCover}
          className="w-16 md:w-32 max-w-full max-h-full"
          alt={product?.title}
        />
      </td>

      <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
        {product?.title}
      </td>

      <td className="px-6 py-4">
        <div className="flex items-center space-x-2">
          {/* Decrement */}
          <button
            type="button"
            onClick={() => UpdateQuantity(product._id, count - 1)}
            disabled={count <= 1} // prevent negative values
            className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 disabled:opacity-50"
          >
            -
          </button>

          <span className="px-3">{count}</span>

          {/* Increment */}
          <button
            type="button"
            onClick={() => UpdateQuantity(product._id, count + 1)}
            className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600"
          >
            +
          </button>
        </div>
      </td>

      <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
        ${price}
      </td>

      <td className="px-6 py-4">
        <button
          type="button"
          onClick={() => UpdateQuantity(product._id, 0)}
          className="font-medium text-red-600 dark:text-red-500 hover:underline"
        >
          Remove
        </button>
      </td>
    </tr>
  );
}
