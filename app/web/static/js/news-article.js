// News Article JavaScript for HTML content processing
document.addEventListener('DOMContentLoaded', function() {
    console.log('News article page loaded');
    
    // Process HTML content in the article
    const articleContent = document.querySelector('.article-content');
    if (articleContent) {
        const originalContent = articleContent.innerHTML;
        
        // Basic HTML tag processing (simple approach)
        let processedContent = originalContent
            // Convert <p> tags to proper paragraphs
            .replace(/<p>/g, '</p><p class="article-paragraph">')
            .replace(/<\/p>/g, '</p>')
            // Convert <br> to line breaks
            .replace(/<br\s*\/?>/gi, '<br>')
            // Convert <strong> and <b> to bold
            .replace(/<(strong|b)>/gi
