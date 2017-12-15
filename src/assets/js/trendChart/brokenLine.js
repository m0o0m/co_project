(function ($) {
  
  $.fn.brokenLine = function (options) {
    
    return this.each(function () {
      var tbody = "";
      var head = "<tr>";
     
      for (var i = 1; i < options.rows; i++) {
        tbody += "<tr>";
        for (var j = 1; j < options.cols; j++) {
          tbody += "<td id='" + options.idName + i + "_" + j + "'>" + j + "</td>";
        }
        tbody += "</tr>";
      }
      for (var j = 1; j < options.cols; j++) {
        head += "<th>" + j + "</th>";
      }
      head += "</tr>";
      var canvasBox = '<div id="canvasdiv"></div>'
      $(options.tableId).find("thead").html(head);
      $(options.tableId).find("tbody").html(tbody);
      $(this).append($(canvasBox));
      let tdheight =$(".lineChartTable tbody tr td").outerWidth();
      $(".lineChartTable td").height(tdheight);
      $(".lineChartIssue td").height(tdheight);
      CreateLine(options)
    })
    
    function CreateLine(options) {
      var list = options.lists.split(",");
      for (var j = list.length - 1; j > 0; j--) {
        var tid = $("#" + list[j]);
        var fid = $("#" + list[j - 1]);
        tid.addClass("on");
        fid.addClass("on");
        var f_width = fid.outerWidth();
        var f_height = fid.outerWidth();
        console.log("f_width:",f_width);
        console.log("f_height:",f_height);
        var f_offset = fid.offset();
        var f_top = f_offset.top;
        var f_left = f_offset.left;
        var t_offset = tid.offset();
        var t_top = t_offset.top;
        var t_left = t_offset.left;
        var cvs_left = Math.min(f_left, t_left);
        var cvs_top = Math.min(f_top, t_top);
        tid.css("background", options.bgColor).css("color", options.textColor);
        fid.css("background", options.bgColor).css("color", options.textColor);
        var cvs = document.createElement("canvas");
        cvs.width = Math.abs(f_left - t_left) < options.minWidth ? options.minWidth : Math.abs(f_left - t_left);
        cvs.height = Math.abs(f_top - t_top);
        cvs.style.top = cvs_top + parseInt(f_height / 2) + "px";
        cvs.style.left = cvs_left + parseInt(f_width / 2) + "px";
        cvs.style.position = "absolute";
        var cxt = cvs.getContext("2d");
        cxt.save();
        cxt.strokeStyle = options.lineColor;
        cxt.lineWidth = 1;
        cxt.lineJoin = "round";
        cxt.beginPath();
        cxt.moveTo(f_left - cvs_left, f_top - cvs_top);
        cxt.lineTo(t_left - cvs_left, t_top - cvs_top);
        cxt.closePath();
        cxt.stroke();
        cxt.restore();
        $(options.canvasId).append(cvs);
      }
    }
  }
})(jQuery)