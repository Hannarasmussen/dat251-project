# RecommendationControllerApi

All URIs are relative to *http://localhost:8080*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**recommend**](#recommend) | **GET** /api/recommendations | |
|[**recordSelection**](#recordselection) | **POST** /api/recommendations/select/{recipeId} | |

# **recommend**
> object recommend()


### Example

```typescript
import {
    RecommendationControllerApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new RecommendationControllerApi(configuration);

let userId: number; // (default to undefined)
let limit: number; // (optional) (default to 10)

const { status, data } = await apiInstance.recommend(
    userId,
    limit
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **userId** | [**number**] |  | defaults to undefined|
| **limit** | [**number**] |  | (optional) defaults to 10|


### Return type

**object**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: */*


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | OK |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **recordSelection**
> { [key: string]: object; } recordSelection()


### Example

```typescript
import {
    RecommendationControllerApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new RecommendationControllerApi(configuration);

let userId: number; // (default to undefined)
let recipeId: string; // (default to undefined)

const { status, data } = await apiInstance.recordSelection(
    userId,
    recipeId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **userId** | [**number**] |  | defaults to undefined|
| **recipeId** | [**string**] |  | defaults to undefined|


### Return type

**{ [key: string]: object; }**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: */*


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | OK |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

