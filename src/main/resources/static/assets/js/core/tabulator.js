class Table {

    constructor(id, useUrl = true) {
        this._id = id
        this._useUrl = useUrl
        this._subTable = false                              // 서브 테이블 여부
        this._layout = "fitDataFill"                        // 테이블 레이아웃
        this._placeholder = "검색결과가 존재하지 않습니다."      // 데이터 0건일 경우
        this._minHeight = 50
        this._maxHeight = 300
        this._columnHeaderVertAlign = ""                    // align header contents to bottom of cell
        this._resizeable = false                            // 테이블 row resize 가능 여부
        this._rowFormatter = null                           // 테이블 각 row formatter
        this._rowClick = null                               // 테이블 각 row click function
        this._selectable = false                            // 테이블 row select 가능 여부
        this._afterComplete = null                          // 테이블 draw after
        this._checkbox = false

        this._pagination = false
        this._paging = 'local'
        this._paginationSize = 6
        this._paginationSizeSelector = [3, 6, 8, 10]
        this._movableColumns = true
        this._paginationCounter = "rows"

        this._columns = []
        this._url = ''
        this._data = []
        this._selectedRows = []
        this._table = null
    }

   /*
    * table data reload
    */
    submit(){
        Http.get(`${this._url}`).then((res) => {
            if (res['httpStatus'] === 200) {
                const data = res.message.map((item, index) => ({...item, index: index + 1}))
                this._table.replaceData(data)
            }
        })
    }

    /*
    * use pagination
    */
    usePagination() {
        this._pagination = true
        return this
    }

   /*
    * select row to deselect
    */
    deselectAll(){
        this._table.deselectRow();
        this._selectedRows = []
    }

    /*
    * @param: url
    */
    get(url = '') {
        this._url = url
        return this
    }

    /*
    * use checkbox
    */
    checkbox() {
        this._checkbox = true
        return this
    }

    /*
    * row selectable true
    */
    selectable() {
        this._selectable = true
        return this
    }

    /*
    * @param: data[]
    */
    setData(data = []){
        this._data = data
        return this
    }

    /*
    * make subTable
    */
    subTable(){
        this._subTable = true
        return this
    }

    /*
    * @param: layout
    * - default: fitDataFill
    */
    changeLayout(layout = ''){
        this._layout = layout
        return this
    }

    /*
    * rowClick: rowClick use
    */
    rowClick(callback) {
        this._rowClick = callback
        return this
    }

    /*
    * rowFormatter: rowFormatter use
    */
    rowFormatter(callback) {
        this._rowFormatter = callback
        return this
    }

    /*
    * afterComplete: settings after draw table
    */
    afterComplete(callback) {
        this._afterComplete = callback
        return this
    }

    /*
    * @param: val
    * - default: false
    * - can resize column
    * */
    resizeable(){
        this._resizeable = true
        return this
    }

    /*
     * header bottom
     * */
    headerBottom() {
        this._columnHeaderVertAlign = "bottom"
        return this
    }

    /*
    * get selected rows list
    */
    getSelectedRows() {
        return this._selectedRows
    }

    /*
    * @param: column
    * - table column add
    */
    add(column) {
        if(column instanceof Column) {
            this._columns.push(column.getCol())
        }
        return this
    }

    /*
    * draw table
    * - subTable : use data[] and draw
    * - table : get data and draw
    */
    init() {
        if(!this._useUrl) {
            const data = this._data.map((item, index) => ({ ...item, index: index + 1 }))
            this._initOptions(data)
        }else {
            Http.get(`${this._url}`).then((res) => {
                if (res['httpStatus'] === 200) {
                    // 1. data with index
                    const data = res.message.map((item, index) => ({...item, index: index + 1}))
                    this._initOptions(data)
                }
            })
        }
    }

    /*
    * table options
    */
    _initOptions(data){

        if(this._checkbox) {
            const checkbox = {
                formatter: "rowSelection",
                titleFormatter: "rowSelection",
                hozAlign: "center",
                headerSort: false,
                width: 42,
                cssClass: "tabulator-checkbox",
                cellClick: function(e, cell) {
                    cell.getRow().toggleSelect()
                }
            }
            this._columns.unshift(checkbox)
        }

        // 2. tabulator option
        const option = {
            data: data,
            selectable: this._selectable,
            placeholder: this._placeholder,
            columnHeaderVertAlign: this._columnHeaderVertAlign,
            layout: this._layout,
            minHeight: this._minHeight,
            columnDefaults: {
                resizable: this._resizeable
            },
            columns:this._columns
        }

        if(this._pagination) {
            option['pagination'] = this._paging
            option['paginationSize'] = this._paginationSize
            option['paginationSizeSelector'] = this._paginationSizeSelector
            option['movableColumns'] = this._movableColumns
            option['paginationCounter'] = this._paginationCounter
        }

        if(this._rowFormatter) {
            option['rowFormatter'] = this._rowFormatter
        }

        const dom = (!this._subTable) ? `#${this._id}` : this._id
        const table = new Tabulator(dom, option)

        // if clicking row not null
        if(this._rowClick) {
            table.on('rowClick', (e, row) => {
                if(!e.target.classList.contains("tabulator-checkbox") && !e.target.classList.contains("select")) {
                    this._rowClick(row.getData(), row._row)
                }
            })
        }

        // if after complete not null
        if(this._afterComplete) {
            table.on("renderComplete", () => this._afterComplete())
        }

        table.on("rowSelectionChanged", (data, rows) => this._selectedRows = data )

        this._table = table
    }
}

class Column {

    constructor(field) {
        this._title = ''
        this._field = field
        this._headerSort = false
        this._width = '10%'
        this._hozAlign = 'center'
        this._headerHozAlign = 'center'
        this._formatter = null
        this._columns = []
    }

    title(title = '') {
        this._title = title
        return this
    }

    width(width = '10%'){
        this._width = width
        return this
    }

    headerSort(sort = false) {
        this._headerSort = sort
        return this
    }

    center(){
        this._hozAlign = 'center';
        this._headerHozAlign = 'center'
        return this
    }

    left(){
        this._hozAlign = 'left';
        this._headerHozAlign = 'left'
        return this
    }

    right(){
        this._hozAlign = 'right';
        this._headerHozAlign = 'right'
        return this
    }

    formatter(callback) {
        this._formatter = callback;
        return this
    }

    add(column) {
        if(column instanceof Column) {
            this._columns.push(column.getCol())
        }
        return this
    }

    getCol() {
        const obj = {
            title: this._title,
            headerSort: this._headerSort,
            width: this._width,
            hozAlign: this._hozAlign,
            headerHozAlign: this._headerHozAlign
        }

        if(this._field) obj.field = this._field
        if(this._formatter !== null) obj.formatter = this._formatter
        if(this._columns.length) obj.columns = this._columns

        return obj
    }
}