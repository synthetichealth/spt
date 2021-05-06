class DragDropHelper {
  constructor(onSuccessfulUpload) {
    this.onSuccessfulUpload = onSuccessfulUpload;

    document.body.addEventListener('dragover', (evt) => this.handleDragOver(evt), false);
    document.body.addEventListener('drop', (evt) => this.handleFileSelect(evt), false);
  }

  handleDragOver(evt) {
      evt.stopPropagation();
      evt.preventDefault();
      evt.dataTransfer.dropEffect = 'copy'; // Explicitly show this is a copy.
  }

  handleFileSelect(evt) {
      evt.stopPropagation();
      evt.preventDefault();

      var success = this.onSuccessfulUpload;

      let files = evt.dataTransfer.files;

      // files is a FileList of File objects
      let output = [];
      for (let i = 0, f; f = files[i]; i++) {
        // console.log(f);

       if (f.type === 'application/json') {
         let reader = new FileReader();

            reader.onload = function(e) {
             let result = JSON.parse(reader.result);
             success(result);
            }

            reader.readAsText(f);    
      }
    }
  }
}