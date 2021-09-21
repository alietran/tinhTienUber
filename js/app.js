   
//    khai báo mảng cho các giá của xe và giá chờ
   const ARRAY_GIA_UBER_X = [8000,12000,10000];
    const GIA_CHO_UBER_X = 2000;

    const ARRAY_GIA_SUV = [9000,14000,12000];
    const GIA_CHO_SUV = 3000;

    const ARRAY_GIA_BLACK = [10000,16000,14000];
    const GIA_CHO_BLACK = 4000;

    function kiemtraloaixe(){
        var uberX = document.getElementById("uberX");
        var uberSUV = document.getElementById("uberSUV");
        var uberBlack = document.getElementById("uberBlack");
       
        if(uberX.checked){
            return "uberX";
        }
        else if(uberSUV.checked){
            return "uberSUV";
        }
        else if(uberBlack.checked){
            return "uberBlack";
        }
        
    }
// trên 3' tính tiền chờ, cứ 3' tính một lần
    function  tinhtienCho(thoiGianCho, giacho){
      var  tiencho = 0;
      if (thoiGianCho  >= 3){
          tiencho = Math.round(thoiGianCho / 3.0) * giacho;

      }
      return tiencho;

    }

// tính tiền
    function tinhtien(soKM, thoiGianCho, arrayPrice, giacho){
        
        var tiencho = tinhtienCho(thoiGianCho, giacho);
        
        if(soKM <= 1){
            return tiencho + arrayPrice[0] ;        
        }
        else if(soKM > 1 && soKM <=20){
            return arrayPrice[0] + (soKM-1) *arrayPrice[1] + tiencho;        
        }
        else if(soKM > 20){
            return tiencho + arrayPrice[0] + 19 * arrayPrice[1] + (soKM-20) *arrayPrice[2] ;        
        }
    }
// hàm lấy dữ liệu đc sử dụng nhiều lần
    function getData(){
        var kq = [];
        var soKM = document.getElementById("soKM").value;
        soKM = parseFloat(soKM);
        kq.push(soKM);
        var thoiGianCho = document.getElementById("thoiGianCho").value;
        thoiGianCho = parseFloat(thoiGianCho);
        kq.push(thoiGianCho);
        return kq;
    }
// tính tổng tiền
    function tinhTongTien(){
        var kq = getData();
       var tongtien = 0;
       var loaixe = kiemtraloaixe();

        switch(loaixe)
        {
            case "uberX" :
                return tinhtien(kq[0],kq[1],ARRAY_GIA_UBER_X,GIA_CHO_UBER_X) + tongtien;
            break;
            case "uberSUV" :
                return tinhtien(kq[0],kq[1],ARRAY_GIA_SUV,GIA_CHO_SUV) +tongtien;
            break;
            case "uberBlack" :
                return tinhtien(kq[0],kq[1],ARRAY_GIA_BLACK,GIA_CHO_BLACK) +tongtien;
            break;
            default: alert("Vui lòng chọn loại xe! ");
            }
            
        return tongtien;
    }

    // sự kiện nút click 
    document.getElementById("btnTinhTien").onclick = function (){
        var tongtien = tinhTongTien();
        document.getElementById("divThanhTien").style.display  = "block";
        document.getElementById("xuatTien").innerHTML = tongtien;
    }

    // in BILL
    function renderRowChiTietKm(loaixe, arrayKM, arrayPrice, tblBody){
        for(var i = 0 ; i < arrayKM.length; i++){
            var tr = document.createElement("tr");

            var tdLoaiXe = document.createElement("td");
            var tdSuDung = document.createElement("td");
            var tdDonGia = document.createElement("td");
            var tdThanhTien = document.createElement("td");

            tdLoaiXe.innerHTML = loaixe;
            tdSuDung.innerHTML = arrayKM[i] + "km";
            tdDonGia.innerHTML = arrayPrice[i];
            tdThanhTien.innerHTML = arrayKM[i] * arrayPrice[i];


            tr.appendChild(tdLoaiXe);
            tr.appendChild(tdSuDung);
            tr.appendChild(tdDonGia);
            tr.appendChild(tdThanhTien);

            tblBody.appendChild(tr);

        }
    }

    function renderRowThoiGianCho(thoiGianCho,giacho,tblBody){
        var trThoiGianCho = document.createElement("tr");
        var tiencho = tinhtienCho(thoiGianCho,giacho);

        var tdPhutTitle  = document.createElement("td");
        var tdPhut = document.createElement("td");
        var tdDonGia = document.createElement("td");
        var tdThanhTien = document.createElement("td");

        tdPhutTitle.innerHTML = "Thời gian chờ ";
        tdPhutTitle.innerHTML = thoiGianCho  + " phút ";
        tdDonGia.innerHTML = giacho;
        tdThanhTien.innerHTML = tiencho;

        trThoiGianCho.appendChild(tdPhutTitle);
        trThoiGianCho.appendChild(tdPhut);
        trThoiGianCho.appendChild(tdDonGia);
        trThoiGianCho.appendChild(tdThanhTien);


        tblBody.appendChild(trThoiGianCho);

    }

    function renderRowTongCong(tongtien,tblBody){
        var trTotal = document.createElement("tr");
        trTotal.className = "alert alert-success";

        var tdTotalTitle = document.createElement("td");
        tdTotalTitle.setAttribute ("colspan",3);
        var tdTotal = document.createElement("td");

        tdTotalTitle.innerHTML = "Tổng tiền phải trả";
        tdTotal.innerHTML = tongtien;

        trTotal.appendChild(tdTotalTitle);
        trTotal.appendChild(tdTotal);

        tblBody.appendChild(trTotal);

    }

    function inHoaDon(loaixe, soKM, thoiGianCho,giacho,arrayPrice,tongtien){
        var tblBody = document.getElementById("tblBody");
        tblBody.innerHTML = "";

        if(soKM <= 1){
            renderRowChiTietKm(loaixe,[1],arrayPrice,tblBody);
            
        }
        else if(soKM > 1 && soKM <=20){
            renderRowChiTietKm(loaixe,[1,soKM-1],arrayPrice,tblBody);

        }
        else if(soKM > 20){
            renderRowChiTietKm(loaixe,[1,19,soKM-20],arrayPrice,tblBody);

        }
        // thời gian chờ
        if(thoiGianCho > 2){
            renderRowThoiGianCho(thoiGianCho,giacho,tblBody);
        }
        //  tính tổng tiền
        renderRowTongCong(tongtien,tblBody);
    }

    // sự kiện nút click 
    document.getElementById("btnInHD").onclick = function (){
        var kq = getData();
         var tongtien = tinhTongTien();
         var loaixe = kiemtraloaixe();

         switch(loaixe)
        {
            case "uberX" :
                inHoaDon(loaixe, kq[0],kq[1],GIA_CHO_UBER_X,ARRAY_GIA_UBER_X,tongtien);
               
            break;
            case "uberSUV" :
                inHoaDon(loaixe, kq[0],kq[1],GIA_CHO_SUV,ARRAY_GIA_SUV,tongtien);
            break;
            case "uberBlack" :
                inHoaDon(loaixe, kq[0],kq[1],GIA_CHO_BLACK,ARRAY_GIA_BLACK,tongtien);
            break;
            default: alert("Vui lòng chọn loại xe! ");
            }
        
    }