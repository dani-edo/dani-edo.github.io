// JavaScript Document
$(document).ready(function () {
    // Variable init --------------------------------------------------------------------------------------------
    var x = "x",
        o = "o",
        count = o_win = x_win = column_set = 0;

    // Event --------------------------------------------------------------------------------------------
    $('form#column_set').submit(function (e) {
        e.preventDefault();
        column_set = parseInt($(this).find('input').val())
        $('.hide-for-play').hide()
        $('.show-for-play').show()
        init()
    })

    $(document).on('click', '#game li', function () {
        if ($(this).hasClass('disable')) {
            alert('Already selected')
        }
        else if (count % 2 == 0) {
            win_test($(this), o)
        }
        else {
            win_test($(this), x)
        }
    });

    $("#reset").click(function () {
        reset()
    });

    // Function --------------------------------------------------------------------------------------------
    function init() {
        for (i = 1; i <= column_set; i++) {
            for (j = 1; j <= column_set; j++) {
                $('#game').append('<li class="btn span1" data-row="' + i + '" data-column="' + j + '">+</li>')
            }
        }
        $('.new_span').width(75 * column_set + 'px')
        $('#tic-tac-toe #game li').width(100 / column_set - 1 + '%')
    }

    function win_test(el, kind) {
        var row = el.data('row'),
            column = el.data('column'),
            row_win = column_win = diagonal_win = right = left = true;

        count++
        el.text(kind).addClass('disable ' + kind + ' ' + (kind == 'o' ? 'btn-primary' : 'btn-info'))

        $('[data-row=' + row + ']').map((i, e) => {
            if (!$(e).hasClass(kind)) {
                row_win = false
            }
        })

        $('[data-column=' + column + ']').map((i, e) => {
            if (!$(e).hasClass(kind)) {
                column_win = false
            }
        })

        $(document).find("#game li").map((i, e) => {
            let this_row = $(e).data('row'), this_column = $(e).data('column');
            if (this_row === this_column && !$(e).hasClass(kind)) {
                right = false
            }
            if (this_row + this_column == 1 + column_set && !$(e).hasClass(kind)) {
                left = false
            }
            diagonal_win = right || left
        })

        if (row_win || column_win || diagonal_win) {
            alert(kind + ' win!')
            if (kind === 'x') {
                x_win++
                $('#x_win').val(x_win)
            } else {
                o_win++
                $('#o_win').val(o_win)
            }
            reset()
        } else if (count == column_set * column_set) {
            alert('Its a tie. It will restart.')
            reset()
        }

    }

    function reset() {
        $("#game li").removeClass('disable o x btn-primary btn-info').text("+");
        count = 0
    }
});