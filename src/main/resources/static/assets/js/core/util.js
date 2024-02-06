class FormDataToObj {
    static async getParameter(formId) {
        const form = document.getElementById(formId);
        const formData = new FormData(form);
        const data = Array.from(formData.entries()).reduce((perv, [key, value]) => {
            if (perv[key]) {
                Array.isArray(perv[key]) ? perv[key].push(value) : (perv[key] = [perv[key], value]);
            } else {
                perv[key] = value;
            }
            return perv;
        }, {});
        return data;
    }
}

class Util {

    static priceString(value){
        return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    }

    static alert(html, icon = 's', btn = 's') {
        return Swal.fire({
            html,
            icon: (icon === 's') ? 'success' : 'warning',
            confirmButtonColor: (btn === 's') ? '#3085d6' : '#d33',
            focusConfirm: false,
            confirmButtonText: "확인"
        });
    }

    static confirm(html, icon = 'w', confirmButtonText = '확인', cancelButtonText = '취소') {
        return Swal.fire({
            html,
            icon: (icon === 'w') ? 'warning' : 'success',
            focusConfirm: false,
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: confirmButtonText,
            cancelButtonText: cancelButtonText,
        }).then((res) => res.isConfirmed)
    }

    static strYN(value, yes = "가능", no = "불가능") {
        return (value === 'Y') ? yes : no;
    }

    static DateSubString(value, s= 0, e = 10) {
        return value.toString().substring(s, e)
    }
}

class Http {

    static get(url, params = '', method = 'GET') {
        return $.ajax({
            type: method,
            url: url,
            data: params,
            dataType: 'json'
        })
    }

    static syncGet(url, params='', async = false, method = 'GET'){
        return $.ajax({
            type: method,
            url: url,
            data: params,
            async: false,
            dataType: 'json'
        })
    }

    static post(url, data, method = 'POST') {
            return $.ajax({
                type: method,
                url: url,
                data: JSON.stringify(data),
                dataType: 'json',
                contentType: 'application/json'
            })
    }

    static delete(url, data, method = 'DELETE') {
        return $.ajax({
            type: method,
            url: url,
            contentType: 'application/json'
        })
    }

    static put(url, data, method='PUT') {
        return $.ajax({
            type: method,
            url: url,
            data: JSON.stringify(data),
            dataType: 'json',
            contentType: 'application/json'
        })
    }

    static filePost(url, formData, method = 'POST'){
        return $.ajax({
            type: method,
            url: url,
            data: formData,
            contentType: false,
            processData: false
        })
    }

    static fileDownload(id){
        let filename = ''
        return $.ajax({
            url: `/api/downloadFile/${id}`,
            method: 'GET',
            xhrFields: {
                responseType: 'blob'
            },
            success: function (blobData, status, xhr) {
                const contentDisposition = xhr.getResponseHeader('Content-Disposition');
                const matches = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/.exec(contentDisposition);
                filename = matches && matches[1] ? matches[1].replace(/['"]/g, '').replace('UTF-8', '') : "";

                if (filename) {
                    const link = $('<a style="display: none;"></a>');
                    link.attr('href', window.URL.createObjectURL(blobData));
                    link.attr('download', decodeURIComponent(filename));
                    $('body').append(link);
                    link[0].click();
                    link.remove();
                }
            }
        });
    }

}
