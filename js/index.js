// JavaScript Document
$(document).ready(function () {
    // Variable init --------------------------------------------------------------------------------------------
    var x = "x",
        o = "o",
        count = o_win = x_win = column_set = rule_win = 0;

    // Event --------------------------------------------------------------------------------------------
    $('form#column_set').submit(function (e) {
        e.preventDefault();
        column_set = parseInt($(this).find('#column_set_input').val())
        rule_win  = parseInt($(this).find('#rule_win_set_input').val())
        if (rule_win > column_set) {
            alert('maximum number of rule win is the number of rows/columns')
        } else {
            init()
        }
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
        $('.hide-for-play').hide()
        $('.show-for-play').show()
        $('.new_span').width(75 * column_set + 'px')
        $('#tic-tac-toe #game li').width(100 / column_set - 1 + '%')
    }

    function win_test(el, kind) {
        var row = el.data('row'),
            column = el.data('column'),
            sum = row + column,
            difference = row - column,
            row_win = column_win = diagonal_win = right = left = true,
            column_kind_set = [], row_kind_set = [], right_kind_set = [], left_kind_set = [];

        count++
        el.text(kind).addClass('disable ' + kind + ' ' + (kind == 'o' ? 'btn-primary' : 'btn-info'))

        $('[data-row=' + row + ']').map((i, e) => {
            if ($(e).hasClass(kind)) {
                column_kind_set.push($(e).data('column'))
            }
        })
        row_win = order_test(column_kind_set)

        $('[data-column=' + column + ']').map((i, e) => {
            if ($(e).hasClass(kind)) {
                row_kind_set.push($(e).data('row'))
            }
        })
        column_win = order_test(row_kind_set)

        $(document).find("#game li").map((i, e) => {
            let this_row = $(e).data('row'), this_column = $(e).data('column');
            if (this_row - this_column === difference && $(e).hasClass(kind)) {
                right_kind_set.push(this_row)
            }
            if (this_row + this_column == sum && $(e).hasClass(kind)) {
                left_kind_set.push(this_column)
            }
        })
        right = order_test(right_kind_set)
        left = order_test(left_kind_set.sort())
        diagonal_win = right || left

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

    function order_test(e) {
        var order_old = e[0], valid = false, 
            logical_order = [], array_true = [];

        if (e.length < rule_win) {
            valid = false
        } else {
            e.map((order) => {
                logical_order.push(order_old === order - 1)
                order_old = order
            })
            logical_order.map((e)=> {
                if (e) {
                    array_true.push(e)
                } else {
                    array_true = []
                }
                if (array_true.length === rule_win - 1) {
                    valid = true
                }
            })
        }
        return valid
    }
});