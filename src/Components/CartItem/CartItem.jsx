export default function CartItem({ count, price, product }) {
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
        {count}
      </td>
      <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
        ${price}
      </td>
      <td className="px-6 py-4">
        <a
          href="#"
          className="font-medium text-red-600 dark:text-red-500 hover:underline"
        >
          Remove
        </a>
      </td>
    </tr>
  );
}
