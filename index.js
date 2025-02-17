$(document).ready(function() {
    $(".editable").click(function() {
        if ($(this).find("textarea").length === 0) {
            let currentText = $(this).text().trim();
            
            // Get original dimensions
            let width = $(this).outerWidth();
            let height = $(this).outerHeight();

            // Create textarea with matching dimensions
            let textarea = $("<textarea>")
                .addClass("edit-textarea")
                .val(currentText)
                .css({
                    width: width + "px",
                    height: height + "px"
                });

            $(this).html(textarea);
            textarea.focus();

            // Adjust textarea height dynamically as user types
            textarea.on("input", function() {
                this.style.height = "auto"; // Reset height
                this.style.height = this.scrollHeight + "px"; // Adjust to content
            });

            // When textarea loses focus, save the text
            textarea.blur(function() {
                let newText = $(this).val().trim();
                $(this).parent().text(newText);
            });

            // Save on Enter key press (but allow new lines with Shift+Enter)
            textarea.keypress(function(event) {
                if (event.which === 13 && !event.shiftKey) { // Enter key
                    event.preventDefault(); // Prevent new line
                    let newText = $(this).val().trim();
                    $(this).parent().text(newText);
                }
            });
        }
    });
});