// Wait for jQuery since your site heavily depends on it
$(document).ready(function() {
    console.log('Language switcher initializing...');
    if ($('#languageSwitcher').length === 0) {
        console.error('Language button not found');
        return;
    }

    // Set initial language
    const currentLang = localStorage.getItem('selectedLanguage') || 'en';
    console.log('currentLang', currentLang);
    const $languageButton = $('#languageSwitcher');
    // Cache the button reference
    const $button = $languageButton.length ? $languageButton : $(this);
    $button.text(currentLang === 'en' ? 'VI' : 'EN');
    console.log('languageButton text:', $button.text());
    // initializeLanguageSwitcher(currentLang);
    $('body').on('click', '#languageSwitcher', function(e){
        e.preventDefault();
        e.stopPropagation();
    
        const currentLang = localStorage.getItem('selectedLanguage') || 'en';
        const newLang = currentLang === 'en' ? 'vi' : 'en';
        localStorage.setItem('selectedLanguage', newLang);
        updateContent(newLang);
        // $('#languageSwitcher').text(newLang === 'en' ? 'VI' : 'EN');
        var $this = $(this);
        $this.text(newLang === 'en' ? 'VI' : 'EN');
    });

    function initializeLanguageSwitcher(lang) {
        $('#languageSwitcher').text(lang === 'en' ? 'VI' : 'EN');
        updateContent(lang);
    }

    function updateContent(lang) {
        console.log('Updating content for', lang);
        // Update navigation items
        $('a[href="index.html"]').text(translations[lang].home);
        $('a[href="#fh5co-event"]').text(translations[lang].events);
        $('a[href="#fh5co-gallery"]').text(translations[lang].gallery);
        $('a[href="#fh5co-services"]').text(translations[lang].highlights);

        // Update love story section
        $('#fh5co-couple-story h2').text(translations[lang].ourLoveStory);
        $('#fh5co-couple-story .fh5co-heading p').text(translations[lang].howWeMet);

        // Update wishes section
        $('#fh5co-started h2').text(translations[lang].sendWishes);
        $('#fh5co-started p').text(translations[lang].shareWishes);
        $('#name').attr('placeholder', translations[lang].yourName);
        $('#title').attr('placeholder', translations[lang].wishTitle);
        $('#message').attr('placeholder', translations[lang].yourMessage);
        $('#wishForm button').text(translations[lang].sendWishButton);

        // Update friends wishes section
        $('#fh5co-testimonial h2').text(translations[lang].friendsWishes);
        $('#fh5co-testimonial p').text(translations[lang].kindWords);

        // Update save date button
        $('a.btn.btn-default.btn-sm').text(translations[lang].saveDate);
    }
});