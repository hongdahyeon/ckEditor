class Util {

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

}
