import React from "react";

export default function FileBase64({ multiple, onDone ,disabled , a ,name,click}) {
  const handleChange = (e) => {
    // get the files
    let files = e.target.files;

    // Process each file
    var allFiles = [];
    for (var i = 0; i < files.length; i++) {
      let file = files[i];

      // Make new FileReader
      let reader = new FileReader();

      // Convert the file to base64 text
      reader.readAsDataURL(file);

      // on reader load somthing...
      reader.onload = () => {
        // Make a fileInfo Object
        let fileInfo = {
          name: file.name,
          type: file.type,
          size: Math.round(file.size / 1000) + " kB",
          base64: reader.result,
          file: file,
        };

        // Push it to the state
        allFiles.push(fileInfo);

        // If all files have been proceed
        if (allFiles.length == files.length) {
          // Apply Callback function
          if (multiple) onDone(allFiles);
          else onDone(allFiles[0]);
        }
      }; // reader.onload
    } // for
  };
  
  return (
    <input
      className="form-control block w-full text-base font-normal text-gray-700 bg-white 
      bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out mt-3 mb-4 
      focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
      type="file"
      id = {a}
      require
      onChange={handleChange}
      multiple={multiple}
      name = {name}
      disabled = {disabled}
      onClick = {click}
    >
      </input>
  );
}
