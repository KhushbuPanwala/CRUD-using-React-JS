//const currentPage = 1;
//const itemsPerPage= 10;
//const upperPageBound = 5;
//const lowerPageBound = 0;
//const isPrevBtnActive = 'disabled';
//const isNextBtnActive = '';
//const pageBound = 3;

export function handleClick(event) {
    let listid = Number(event.target.id);
    this.setState({
        currentPage: listid
    });
    this.setPrevAndNextBtnClass(listid);
}

export function setPrevAndNextBtnClass(listid, data) {
    let totalPage = Math.ceil(data.length / this.state.itemsPerPage);
    this.setState({ isNextBtnActive: 'disabled' });
    this.setState({ isPrevBtnActive: 'disabled' });
    if (totalPage === listid && totalPage > 1) {
        this.setState({ isPrevBtnActive: '' });
    }
    else if (listid === 1 && totalPage > 1) {
        this.setState({ isNextBtnActive: '' });
    }
    else if (totalPage > 1) {
        this.setState({ isNextBtnActive: '' });
        this.setState({ isPrevBtnActive: '' });
    }
}

export function btnIncrementClick() {
    this.setState({ upperPageBound: this.state.upperPageBound + this.state.pageBound });
    this.setState({ lowerPageBound: this.state.lowerPageBound + this.state.pageBound });
    let listid = this.state.upperPageBound + 1;
    this.setState({ currentPage: listid });
    this.setPrevAndNextBtnClass(listid);
}

export function btnDecrementClick() {
    this.setState({ upperPageBound: this.state.upperPageBound - this.state.pageBound });
    this.setState({ lowerPageBound: this.state.lowerPageBound - this.state.pageBound });
    let listid = this.state.upperPageBound - this.state.pageBound;
    this.setState({ currentPage: listid });
    this.setPrevAndNextBtnClass(listid);
}

export function btnPrevClick() {
    if ((this.state.currentPage - 1) % this.state.pageBound === 0) {
        this.setState({ upperPageBound: this.state.upperPageBound - this.state.pageBound });
        this.setState({ lowerPageBound: this.state.lowerPageBound - this.state.pageBound });
    }
    let listid = this.state.currentPage - 1;
    this.setState({ currentPage: listid });
    this.setPrevAndNextBtnClass(listid);
}

export function btnNextClick() {
    if ((this.state.currentPage + 1) > this.state.upperPageBound) {
        this.setState({ upperPageBound: this.state.upperPageBound + this.state.pageBound });
        this.setState({ lowerPageBound: this.state.lowerPageBound + this.state.pageBound });
    }
    let listid = this.state.currentPage + 1;
    this.setState({ currentPage: listid });
    this.setPrevAndNextBtnClass(listid);
}