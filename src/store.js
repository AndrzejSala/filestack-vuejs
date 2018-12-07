export default {
    debug: true,
    state: {
        message: 'Hello!',
        files: []
    },
    resetFiles() {
        this.state.files = []
    },
    addFile(file) {
        file.forEach(item => {
            console.log('###22', item)
            this.state.files.push(item)
        })
        console.log('###33', this.state.files.length)
    },
    getFiles() {
        return this.state.files
          .filter(item => {
            return item.isSelected;
          })
          .map(item => {
            return item.id;
          });
    },
    setFiles(newValue) {
        console.log('###5', newValue)
        for (let file of this.state.files) {
            this.state.files[file.id].isSelected = newValue.includes(file.id) ? true : false;
        }
        console.log('###6', this.state.files)
        console.log('###7', this.getFiles())
    }
}
