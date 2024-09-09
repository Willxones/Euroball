import ReactGA from "react-ga4"

export default function PrivacyPolicy() {
    ReactGA.send({
        hitType: "pageview",
        page: `/privacy-policy`,
        title: `Privacy Policy`
      })
    return (
            <div className="container mx-auto px-4 py-8 text-black dark:text-white">
              <h1 className="mb-6 text-3xl font-bold">Privacy Policy for Euroball</h1>
              
              <p className="mb-4">Last Updated: 09.09.2024</p>
        
              <p className="mb-4">
                At Euroball, we take your privacy seriously. This privacy policy outlines how we collect, use, and protect your personal information when you visit our website.
              </p>
        
              <h2 className="mb-4 mt-6 text-2xl font-bold">1. Who We Are</h2>
              <p className="mb-4">
                Euroball (“we,” “our,” or “us”) is a UK-based website accessible globally. Our website provides content related to sports news, particularly focused on European football. This privacy policy applies to all visitors of our website.
              </p>
        
              <h2 className="mb-4 mt-6 text-2xl font-bold">2. What Information We Collect</h2>
              <p className="mb-4">We do not directly collect any personally identifiable information such as names, addresses, or emails as we do not operate any user account system. However, we may collect certain non-personally identifiable information automatically through cookies and third-party services.</p>
        
              <h3 className="mb-2 mt-4 text-xl font-semibold">a. Cookies and Tracking Technologies</h3>
              <p className="mb-4">
                Our website uses cookies and similar tracking technologies to enhance your experience and gather information about your interactions with the site. These cookies include:
              </p>
              <ul className="mb-4 list-inside list-disc">
                <li><strong>Google Analytics</strong>: We use Google Analytics to understand how visitors use our website. This service collects data like your IP address, device type, browser, and pages visited, which helps us analyze and improve site performance.</li>
                <li><strong>Google Ads</strong>: We use Google Ads to display relevant advertisements. These ads may track your interactions for targeting and analytics.</li>
                <li><strong>Contentful</strong>: Our content is served through Contentful, which may collect non-personal data such as device type, browser, and IP address for operational purposes.</li>
              </ul>
        
              <h3 className="mb-2 mt-4 text-xl font-semibold">b. Cookies We Use</h3>
              <p className="mb-4">The following cookies may be set by third parties when you use our website:</p>
              <ul className="mb-4 list-inside list-disc">
                <li><strong>Google Analytics (_ga, _gid)</strong>: Tracks website usage statistics.</li>
                <li><strong>Google Ads (_gads, _gac_)</strong>: Used for ad targeting and tracking.</li>
                <li><strong>Contentful Cookies</strong>: May include session-related cookies for content delivery like `_uetvid`, `_hjSessionUser`, etc.</li>
              </ul>
        
              <h2 className="mb-4 mt-6 text-2xl font-bold">3. How We Use Your Information</h2>
              <p className="mb-4">
                We use the non-personal data collected through cookies for the following purposes:
              </p>
              <ul className="mb-4 list-inside list-disc">
                <li>To analyze website traffic and improve the user experience.</li>
                <li>To deliver relevant advertisements via Google Ads.</li>
                <li>To ensure the proper functioning of the website, including content delivery from Contentful.</li>
              </ul>
        
              <h2 className="mb-4 mt-6 text-2xl font-bold">4. Your Choices Regarding Cookies</h2>
              <p className="mb-4">
                You can manage your cookie preferences through our cookie consent banner, which allows you to accept or decline non-essential cookies such as those used by Google Analytics and Ads. You can also modify your browser settings to manage or block cookies.
              </p>
              <h3 className="mb-2 mt-4 text-xl font-semibold">Declining Cookies:</h3>
              <p className="mb-4">If you choose to decline cookies, certain functionality of the website may be affected, such as the display of personalized advertisements.</p>
        
              <h2 className="mb-4 mt-6 text-2xl font-bold">5. Data Security</h2>
              <p className="mb-4">
                We take reasonable precautions to protect the data collected through our website. However, please note that no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.
              </p>
        
              <h2 className="mb-4 mt-6 text-2xl font-bold">6. Third-Party Services</h2>
              <p className="mb-4">
                We use third-party services like Google Ads and Contentful, which may collect data through their platforms. These third parties have their own privacy policies, and we encourage you to review them:
              </p>
              <ul className="mb-4 list-inside list-disc">
                <li><a href="https://policies.google.com/privacy" className="text-blue-600 hover:underline">Google Privacy Policy</a></li>
                <li><a href="https://www.contentful.com/legal/privacy/" className="text-blue-600 hover:underline">Contentful Privacy Policy</a></li>
              </ul>
        
              <h2 className="mb-4 mt-6 text-2xl font-bold">7. Data Transfer Outside the UK</h2>
              <p className="mb-4">
                Since our website is available globally, the data we collect may be transferred to and stored in countries outside the UK, including those that may have different data protection laws. We ensure that any such transfers comply with applicable data protection regulations.
              </p>
        
              <h2 className="mb-4 mt-6 text-2xl font-bold">8. Your Rights (For UK and EU Visitors)</h2>
              <p className="mb-4">
                If you are a resident of the UK or the European Union, you have certain rights under the General Data Protection Regulation (GDPR), including the right to:
              </p>
              <ul className="mb-4 list-inside list-disc">
                <li>Request access to the data we hold about you.</li>
                <li>Request the correction or deletion of your personal data (if applicable).</li>
                <li>Object to the processing of your data.</li>
                <li>Request the restriction of data processing in certain circumstances.</li>
              </ul>
        
              <p className="mb-4">Since we do not collect personally identifiable information directly, these rights may not apply to our use of cookies. However, you can manage your cookie preferences as described above.</p>
        
              <h2 className="mb-4 mt-6 text-2xl font-bold">9. Changes to This Privacy Policy</h2>
              <p className="mb-4">
                We may update this privacy policy from time to time to reflect changes in our practices or legal requirements. Any updates will be posted on this page with the date of the last update.
              </p>
        
              <h2 className="mb-4 mt-6 text-2xl font-bold">10. Contact Us</h2>
              <p className="mb-4">
                If you have any questions or concerns about this privacy policy, please <a href="/contact" className="font-bold text-blue-400">contact us</a>
              </p>
            </div>
          );
}