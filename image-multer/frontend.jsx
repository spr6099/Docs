const [formData, setformData] = useState({
  name: "",
  amount: "",
  productImage: null,
});
const [preview, setPreview] = useState(null);

const handleChange = (e) => {
  const { name, value, files } = e.target;

  if (name === "productImage") {
    const file = files[0];
    setformData((prev) => ({ ...prev, file: file }));
    // ✅ preview new selected image
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  } else {
    setformData((prev) => ({ ...prev, [name]: value }));
  }
};

const handleSubmit = async (e) => {
  // use formData
};

const handleEdit = (product) => {
  setformData({
    name: product.name,
    amount: product.amount,
    file: null, // file optional on edit
  });
  setEditId(product._id);
  // ✅ show existing image
  setPreview(`${baseUrl}/uploads/${product.image}`);
};

// use below input
<img src={preview} />;
// in table
<img src={`${baseUrl}/uploads/${product.image}`} />;
