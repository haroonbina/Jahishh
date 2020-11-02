import React, { useEffect } from 'react';
import HomeNav from './HoomNav';
import MobileMenu from './MobileMenu';
import HomeFooter from './HomeFooter';

const Documentation = () =>{
    useEffect(() =>{
        window.scrollTo(0, 0);
    }, [])
    return (
        <div id="documentation-page">
            <HomeNav />
            <MobileMenu />
            <div className="documentation-content">
                <div className="container py-5">
                    <h4 className="mb-3">System Sammary</h4>
                    <p>
                        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Deleniti recusandae sunt perferendis optio, ex in excepturi reprehenderit reiciendis ducimus similique, cupiditate consequuntur repellendus soluta distinctio dolores vero adipisci officiis debitis corporis suscipit? Hic accusamus, doloribus, rerum odio sunt quae nihil dolore qui aperiam ullam et eaque dolores laborum exercitationem optio dolorem quis mollitia beatae repellendus maxime suscipit! Et architecto maxime sed illum nam deserunt, illo iusto quae enim eum perferendis veritatis pariatur sint doloribus dolore voluptate ipsam consequuntur minima consectetur at, sapiente fugiat. Quisquam dolorum iusto quasi quaerat quia maxime neque laudantium tenetur esse in sint, adipisci cumque non? Sapiente tempora nostrum, veritatis alias tenetur similique cum explicabo aspernatur possimus magni eum dolores error, quam nesciunt omnis laudantium. Corporis earum minus illum cumque asperiores possimus unde facere repellat molestiae sed odio vero at recusandae dolorem, suscipit, eveniet nobis. Repellendus voluptate sint ex voluptates, quod adipisci eligendi necessitatibus dolorem maiores quae facere, magni rerum commodi. Quos nesciunt, laborum labore magni perferendis reiciendis aut doloribus natus qui fuga necessitatibus quidem aliquid aperiam repellendus rem mollitia velit expedita ipsa. Officiis accusantium eveniet facere! Commodi veniam fuga minima. Veniam odio mollitia, ducimus quas expedita vero, ullam minima sapiente, ab ipsum obcaecati quo odit quis ea blanditiis aperiam! Dolorum, deleniti neque quidem aspernatur inventore praesentium voluptate cumque eaque. Voluptatem, voluptas consequatur! Exercitationem modi praesentium recusandae maiores eum facere minima voluptates vitae accusamus earum quasi enim magni sunt minus repudiandae quam in nostrum, aliquam fugiat! Aliquam nostrum temporibus quae eveniet quidem debitis voluptates minus sunt ullam, eos culpa voluptas, et nulla accusantium eaque magnam fuga quos quod expedita reiciendis ipsa repellendus. Ad mollitia consequuntur placeat veritatis, hic eligendi recusandae porro corporis facilis voluptate voluptatum esse reprehenderit rerum totam velit provident quibusdam ipsam asperiores quasi nulla consectetur earum repudiandae. Illum ex doloribus ab? Odio, suscipit tempora? Modi voluptates ex, inventore quisquam ab porro blanditiis cumque reiciendis amet eos necessitatibus, veritatis, itaque laudantium consequuntur suscipit odit nesciunt vel! Veniam aliquam omnis et possimus necessitatibus consequuntur obcaecati. Pariatur culpa dolorum unde autem placeat excepturi voluptatum, quisquam magni illum quaerat, optio distinctio dolor doloremque corrupti! Dolorum vel possimus, ducimus magnam perspiciatis accusamus adipisci vero nisi quibusdam eaque recusandae eos impedit nemo aspernatur alias, minus asperiores at commodi amet pariatur voluptate! Rem expedita repellendus sapiente. Aut magnam vero, architecto debitis ipsum neque voluptate accusamus libero dolorum facilis eveniet repellendus unde deserunt laudantium. Praesentium nobis consectetur blanditiis, distinctio maiores ducimus exercitationem, nostrum sequi iusto autem dolor dolorum hic atque, laboriosam velit minima. Voluptate quos ad pariatur repellendus voluptatibus ullam voluptatum neque quo recusandae quis, quod veritatis, enim tempora iure, voluptas dicta? Minus numquam architecto odio hic dolorum id quisquam quis rem animi! Eveniet provident ducimus omnis molestias, officiis iste quibusdam doloremque itaque, temporibus nostrum saepe rem minus quaerat eius nulla culpa quo. Dolore impedit animi iste cum aut, sequi blanditiis repellendus molestiae. Blanditiis vitae unde voluptates modi tenetur in debitis sed a? Molestias provident minima deleniti! Maiores sapiente dignissimos soluta! Deserunt animi unde non possimus iusto consectetur, in excepturi repudiandae doloribus quod!
                    </p>
                </div>
            </div>
            <HomeFooter />
        </div>  
    )
}

export default Documentation;