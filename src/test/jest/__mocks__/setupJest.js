require('jest-fetch-mock').enableMocks();

Object.defineProperty(document, 'getElementById', {
    value: function(id) {
        var container = document.createElement('div');
        container.setAttribute('id', 'content');
        container.setAttribute('staticData',
            `{
                "images": {
                    "headerLogo": "headerLogo",
                    "upperSearch": "upperSearch",
                    "lowerSearch": "lowerSearch"
                },
                "headerBannerData": {
                    "text": "headerBannerText",
                    "url": "headerBannerUrl"
                },
                "footerBannerData": [
                    {
                        "text": "footerBannerText"
                    },
                    {
                        "text": "footerBannerContactText"
                    },
                    {
                        "text": "footerBannerContactDetail"
                    }
                ],
                "knowledgeBase": "knowledgeBase",
                "howItWorksData": "howItWorksData"
            }`
        );
        container.setAttribute('initialItemData', '[]');
        return container;
    }
});