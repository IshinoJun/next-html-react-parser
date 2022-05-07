import { Box } from '@chakra-ui/react';
import type { GetServerSideProps, GetStaticProps, NextPage } from 'next';
import { Markdown } from '../../components/markdown';

interface Props {
  article: { content: string };
}

const ArticlePage: NextPage<Props> = ({ article }) => {
  return (
    <Box py='5'>
      <Box maxW='6xl' w='full' px={{ base: '4', sm: '7' }} margin='auto'>
        <Markdown source={article.content} />
      </Box>
    </Box>
  );
};

export default ArticlePage;

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const id = typeof params?.id === 'string' ? params?.id : '';

  return {
    props: {
      article: {
        content:
          '<h2 id="h9707d3a59a">概要</h2><p><a href="https://github.com/nestjs/nest" target="_blank" rel="noopener noreferrer">NestJS</a> のログにスタック情報を追加します。<br><br>デバック時にどこで落ちているか確認をする際、ログからスタック情報を参照出来るのと便利です。<br><br>なお、今回は<a style="background-color:#ffffff" href="https://github.com/nestjs/nest" target="_blank" rel="noopener noreferrer">NestJS</a> の環境が構築されている前提でご説明します。<br></p><h2 id="hf031c5e696">実装方法</h2><h3 id="h3ce1a51dc0">HttpExceptionsFilter を実装</h3><p>NestJSの <a href="https://docs.nestjs.com/exception-filters" target="_blank" rel="noopener noreferrer">Exception filters</a><span style="color:#222222">は例外処理をキャッチし、その例外処理にカスタムの機能を追加することができます。</span><br><br>今回は その <a style="background-color:#ffffff" href="unsafe:[object Object]" target="_blank" rel="noopener noreferrer">Exception filters</a>を用いて、例外が発生する度にスタック情報をログに出力するようにします。<br></p><pre><code>import { ArgumentsHost, Catch, HttpException, Logger } from \'@nestjs/common\';\nimport { BaseExceptionFilter } from \'@nestjs/core\';\n\n@Catch(HttpException)\nexport class HttpExceptionsFilter extends BaseExceptionFilter {\n  private readonly logger = new Logger(HttpExceptionsFilter.name);\n\n  catch(exception: HttpException, host: ArgumentsHost): void {\n    super.catch(exception, host);\n    const status = exception.getStatus();\n\n    if (status &gt;= 500) {\n      this.logger.error(exception.stack);\n    } else {\n      this.logger.warn(exception.stack);\n    }\n  }\n}</code></pre><p><br>exceptionにはエラー情報が含まれます。その情報にスタックが含まれるので、それをログに出力するようにしています。ステータスが500以下は重要度的にも<span style="color:#303030">LogLevelを</span><code>warn</code>にしています。<br></p><h3 id="h012d97d4c5">MainにHttpExceptionsFilterを設定</h3><p>HttpExceptionsFilter をグローバルに適用するようにします。<br></p><pre><code>const { httpAdapter } = app.get(HttpAdapterHost);\napp.useGlobalFilters(new HttpExceptionsFilter(httpAdapter));</code></pre><p><br></p><h3 id="h45437cb5d5">実行結果</h3><p>以下のようにエラー発生すると以下のログが出力されていれば成功です！</p><pre><code>[Nest] 2513&nbsp; - 2021/10/31 14:31:08&nbsp; &nbsp; WARN [HttpExceptionsFilter] UnauthorizedException: Unauthorized\n... エラー箇所のスタック</code></pre><p><br></p><h2 id="ha214098e44">まとめ</h2><p><a style="background-color:#ffffff" href="https://github.com/nestjs/nest" target="_blank" rel="noopener noreferrer">NestJS</a> のログにスタック情報を追加する方法をご紹介しました。デバックが楽になるので良かったら追加してみてください。<br></p>',
      },
    },
  };
};
