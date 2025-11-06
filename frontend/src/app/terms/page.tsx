import { buttonVariants } from "@/components/ui/button";
import { APP_NAME } from "@/lib/variables";
import { ArrowLeftIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

const TermsPage = () => {
  return (
    <div className="max-w-prose mx-auto p-2 space-y-4">
      <Link href="/" className={buttonVariants({})}>
        <ArrowLeftIcon />
        Back Home
      </Link>
      <article className="prose mx-auto">
        <h1>Terms of Service</h1>
        <h2>{APP_NAME}</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. In pulvinar
          nulla tempus semper placerat. Integer sit amet imperdiet orci. Duis
          non euismod tortor. In imperdiet dui ac ligula rhoncus maximus. Cras
          porta sapien id porta blandit. Nulla vestibulum rhoncus urna, mattis
          sollicitudin ligula fermentum a. Nam at pellentesque mi. Donec sit
          amet orci velit. Integer gravida eros non tincidunt aliquet. Mauris
          quam lectus, pretium a ante eget, elementum pretium metus. Fusce
          suscipit urna id lorem congue, eu lacinia ante semper. Sed porttitor
          lorem facilisis enim porttitor vestibulum et vitae est.
        </p>

        <p>
          Pellentesque interdum purus id ipsum maximus egestas. Praesent
          volutpat imperdiet orci eu vestibulum. Proin convallis ultricies
          tortor, quis ornare mi dictum sit amet. Nullam in eleifend magna. Ut
          rhoncus lectus sit amet erat condimentum semper. Ut sagittis tellus ac
          massa consequat tincidunt. Donec gravida a leo sed feugiat. Duis
          suscipit, est a sollicitudin posuere, neque est interdum tortor, id
          cursus nunc sem in massa. Cras accumsan consequat sagittis. Sed risus
          ipsum, vestibulum rutrum posuere eget, aliquet at ipsum. Donec tempus
          accumsan imperdiet. Suspendisse ultrices et augue ac varius.
          Pellentesque id blandit arcu, accumsan faucibus tortor. Curabitur eu
          maximus neque, dictum mollis mi.
        </p>

        <p>
          Sed eleifend volutpat felis, id condimentum risus finibus ac. Praesent
          eget odio sit amet elit feugiat malesuada. Aliquam erat volutpat.
          Aenean vel purus viverra, fermentum urna quis, blandit nisl. Quisque
          tincidunt massa in venenatis pharetra. Cras convallis, justo et
          lobortis mattis, augue ex cursus turpis, non malesuada augue elit
          molestie sem. Phasellus at orci massa. Donec a malesuada sapien.
          Maecenas ut nisl quis purus sollicitudin dapibus ac vel felis.
          Suspendisse potenti. Praesent at gravida ipsum. Integer mauris quam,
          varius ut mauris sed, placerat accumsan lectus. Nunc lacus augue,
          pharetra et lectus viverra, auctor porttitor orci. Proin sollicitudin
          erat leo, nec placerat neque dapibus a. Nulla eget mi metus. Morbi at
          ligula a quam pellentesque facilisis.
        </p>

        <p>
          Etiam ac lorem sit amet felis blandit mattis non in magna. Donec eu
          tincidunt nulla, eget cursus lacus. Praesent aliquet rhoncus
          scelerisque. Ut quam quam, convallis accumsan aliquet non, rutrum a
          lacus. Praesent placerat, lacus ac rhoncus facilisis, magna mauris
          facilisis orci, et luctus eros urna vitae tortor. Aliquam pulvinar
          ligula risus, at posuere ante interdum at. Praesent in tincidunt
          justo. Duis vitae ullamcorper magna, iaculis fringilla risus. Integer
          sed imperdiet nulla, ac ornare felis. Fusce volutpat lorem ex. Donec
          dolor libero, ullamcorper vitae efficitur vel, pulvinar a arcu. Fusce
          blandit accumsan sem, id dignissim libero. Vivamus libero mauris,
          faucibus in ultricies et, blandit ut sapien. Morbi auctor tincidunt
          rutrum. Nunc scelerisque libero vitae purus rhoncus mollis. Donec et
          facilisis nisl.
        </p>
      </article>
    </div>
  );
};

export default TermsPage;
