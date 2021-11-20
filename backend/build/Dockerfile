# goバージョン
FROM golang:1.17.0-alpine
# アップデートとgitのインストール！！
RUN apk upgrade --update && \
    apk --no-cache add git
# appディレクトリの作成
RUN mkdir /go/src/app
# ワーキングディレクトリの設定
WORKDIR /go/src/app
# ホストのファイルをコンテナの作業ディレクトリに移行
ADD ./backend /go/src/app

RUN go get -u github.com/cosmtrek/air && \
    go build -o /go/bin/air github.com/cosmtrek/air

CMD ["air", "-c", ".air.toml"]
