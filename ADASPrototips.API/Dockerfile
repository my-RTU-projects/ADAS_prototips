FROM mcr.microsoft.com/dotnet/aspnet:7.0 AS base
WORKDIR /app/api
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:7.0 AS build
WORKDIR /src
COPY ["ADASPrototips.API.csproj", ""]
RUN dotnet restore "./ADASPrototips.API.csproj"
COPY . .
WORKDIR "/src/."
RUN dotnet build "ADASPrototips.API.csproj" -c Debug -o /app/api/build

FROM build AS publish
RUN dotnet publish "ADASPrototips.API.csproj" -c Debug -o /app/api/publish 

FROM base AS final
WORKDIR /app/api
COPY --from=publish /app/api/publish .
ENTRYPOINT ["dotnet", "ADASPrototips.API.dll"]