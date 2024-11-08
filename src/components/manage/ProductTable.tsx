import { formatCurrency } from "@/utils/currency.util";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "../common/Table";
import { Button } from "../common/Button";
import Pagination from "../common/Pagination";

export interface IProduct {
  id?: number;
  name: string;
  price: number;
  image?: string;
  description: string;
  quantity: number;
}

type Props = {
  products: IProduct[];
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  handleDeleteProduct: (id: number) => void;
};

function ProductTable({
  products,
  handleDeleteProduct,
  ...paginationProps
}: Props) {
  return (
    <section className="w-full">
      <div className="w-full flex justify-end mb-4 pl-4">
        <Button
          buttonType="primary"
          className="rounded-md"
          onClick={() => {
            window.location.href = "/manage/add";
          }}
        >
          Add Product
        </Button>
      </div>
      <Table className="bg-white rounded-md">
        <TableHeader>
          <TableRow>
            <TableHead>Product Name</TableHead>
            <TableHead>Image Url</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Quantity</TableHead>
            <TableHead className="text-right w-[80px]">Price</TableHead>
            <TableHead className="text-center">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product) => (
            <TableRow key={product.id}>
              <TableCell className="font-medium">{product.name}</TableCell>
              <TableCell>{product.image ?? "-"}</TableCell>
              <TableCell>{product.description.slice(0, 20)}</TableCell>
              <TableCell>{product.quantity}</TableCell>
              <TableCell className="text-right">
                {formatCurrency(product.price)}
              </TableCell>
              <TableCell className="flex justify-center items-center gap-3">
                <Button buttonType="primary" className="rounded-md" onClick={() => {
                  window.location.href = `/manage/edit/${product.id}`
                }}>
                  Edit
                </Button>
                <Button
                  buttonType="secondary"
                  className="rounded-md"
                  onClick={() => handleDeleteProduct(product.id!)}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div className="w-full flex justify-end mb-4 pl-4">
        <Pagination {...paginationProps} />
      </div>
    </section>
  );
}

export default ProductTable;
