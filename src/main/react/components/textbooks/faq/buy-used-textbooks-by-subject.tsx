import React from "react";

interface BuyUsedTextbooksBySubjectProps {
    domain: string;
}

export const BuyUsedTextbooksBySubject = (props: BuyUsedTextbooksBySubjectProps) => (

    <div id="buy-used-textbooks-by-subject" className="col-md-9 faq-content text-start">
        <h2 className="text-center text-md-start">Used textbooks by subject</h2>
        <div className="d-flex flex-column flex-md-row text-center text-md-start">
            <ul>
                <li><a href={props.domain + "/new-used-textbooks/antiques-collectibles"}>Antiques & Collectibles</a> (362)</li>
                <li><a href={props.domain + "/new-used-textbooks/architecture"}>Architecture</a> (2,387)</li>
                <li><a href={props.domain + "/new-used-textbooks/art"}>Art</a> (5,930)</li>
                <li><a href={props.domain + "/new-used-textbooks/bibles"}>Bibles</a> (159)</li>
                <li><a href={props.domain + "/new-used-textbooks/biography-autobiography"}>Biography & Autobiography</a> (7,196)</li>
                <li><a href={props.domain + "/new-used-textbooks/body-mind-spirit"}>Body, Mind & Spirit</a> (1,505)</li>
                <li><a href={props.domain + "/new-used-textbooks/business-economics"}>Business & Economics</a> (55,818)</li>
                <li><a href={props.domain + "/new-used-textbooks/comics-graphic-novels"}>Comics & Graphic Novels</a> (416)</li>
                <li><a href={props.domain + "/new-used-textbooks/computers"}>Computers</a> (24,450)</li>
                <li><a href={props.domain + "/new-used-textbooks/cooking"}>Cooking</a> (846)</li>
                <li><a href={props.domain + "/new-used-textbooks/crafts-hobbies"}>Crafts & Hobbies</a> (760)</li>
                <li><a href={props.domain + "/new-used-textbooks/design"}>Design</a> (1,109)</li>
                <li><a href={props.domain + "/new-used-textbooks/drama"}>Drama</a> (2,468)</li>
                <li><a href={props.domain + "/new-used-textbooks/education"}>Education</a> (31,777)</li>
                <li><a href={props.domain + "/new-used-textbooks/family-relationships"}>Family & Relationships</a> (4,353)</li>
                <li><a href={props.domain + "/new-used-textbooks/fiction"}>Fiction</a> (8,441)</li>
                <li><a href={props.domain + "/new-used-textbooks/foreign-language-study"}>Foreign Language Study</a> (21,648)</li>
            </ul>
            <ul>
                <li><a href={props.domain + "/new-used-textbooks/games"}>Games</a> (701)</li>
                <li><a href={props.domain + "/new-used-textbooks/gardening"}>Gardening</a> (378)</li>
                <li><a href={props.domain + "/new-used-textbooks/health-fitness"}>Health & Fitness</a> (4,595)</li>
                <li><a href={props.domain + "/new-used-textbooks/history"}>History</a> (33,583)</li>
                <li><a href={props.domain + "/new-used-textbooks/house-home"}>House & Home</a> (382)</li>
                <li><a href={props.domain + "/new-used-textbooks/humor"}>Humor</a> (320)</li>
                <li><a href={props.domain + "/new-used-textbooks/juvenile-fiction"}>Juvenile Fiction</a> (9,226)</li>
                <li><a href={props.domain + "/new-used-textbooks/juvenile-nonfiction"}>Juvenile Nonfiction</a> (65,557)</li>
                <li><a href={props.domain + "/new-used-textbooks/language-arts-disciplines"}>Language Arts & Disciplines</a> (28,556)</li>
                <li><a href={props.domain + "/new-used-textbooks/law"}>Law</a> (14,806)</li>
                <li><a href={props.domain + "/new-used-textbooks/literary-collections"}>Literary Collections</a> (2,791)</li>
                <li><a href={props.domain + "/new-used-textbooks/literary-criticism"}>Literary Criticism</a> (17,974)</li>
                <li><a href={props.domain + "/new-used-textbooks/mathematics"}>Mathematics</a> (29,377)</li>
                <li><a href={props.domain + "/new-used-textbooks/medical"}>Medical</a> (36,068)</li>
                <li><a href={props.domain + "/new-used-textbooks/music"}>Music</a> (6,704)</li>
                <li><a href={props.domain + "/new-used-textbooks/nature"}>Nature</a> (4,474)</li>
                <li><a href={props.domain + "/new-used-textbooks/performing-arts"}>Performing Arts</a> (4,709)</li>
            </ul>
            <ul>
                <li><a href={props.domain + "/new-used-textbooks/pets"}>Pets</a> (209)</li>
                <li><a href={props.domain + "/new-used-textbooks/philosophy"}>Philosophy</a> (11,321)</li>
                <li><a href={props.domain + "/new-used-textbooks/photography"}>Photography</a> (601)</li>
                <li><a href={props.domain + "/new-used-textbooks/poetry"}>Poetry</a> (4,324)</li>
                <li><a href={props.domain + "/new-used-textbooks/political-science"}>Political Science</a> (30,347)</li>
                <li><a href={props.domain + "/new-used-textbooks/psychology"}>Psychology</a> (18,227)</li>
                <li><a href={props.domain + "/new-used-textbooks/reference"}>Reference</a> (3,746)</li>
                <li><a href={props.domain + "/new-used-textbooks/religion"}>Religion</a> (19,824)</li>
                <li><a href={props.domain + "/new-used-textbooks/science"}>Science</a> (50,397)</li>
                <li><a href={props.domain + "/new-used-textbooks/self-help"}>Self-Help</a> (1,989)</li>
                <li><a href={props.domain + "/new-used-textbooks/social-science"}>Social Science</a> (46,659)</li>
                <li><a href={props.domain + "/new-used-textbooks/sports-recreation"}>Sports & Recreation</a> (2,623)</li>
                <li><a href={props.domain + "/new-used-textbooks/study-aids"}>Study Aids</a> (1,040)</li>
                <li><a href={props.domain + "/new-used-textbooks/technology-engineering"}>Technology & Engineering</a> (28,157)</li>
                <li><a href={props.domain + "/new-used-textbooks/transportation"}>Transportation</a> (2,654)</li>
                <li><a href={props.domain + "/new-used-textbooks/travel"}>Travel</a> (3,245)</li>
                <li><a href={props.domain + "/new-used-textbooks/true-crime"}>True Crime</a> (236)</li>
            </ul>
        </div>
    </div>
);