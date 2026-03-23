<div>
    //-------- center a parent div---------
    // option 1
    <div className="min-h-screen w-full p-5">
      <div className="max-w-6xl mx-auto ">
        <div>Products</div>
      </div>
    </div>;
    
    // option 2 - flexBox
    <div className="min-h-screen flex justify-center">
      <div className="max-w-6xl w-full">
        <div>Product</div>
      </div>
    </div>
    
    // option 3 - Grid
    <div className="min-h-screen grid place-items-center">
      <div className="max-w-6xl w-full">
        Product
      </div>
    </div>



    
</div>